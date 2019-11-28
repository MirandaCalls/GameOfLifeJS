import SparseMatrix from './matrix.js';

export default class GameBoard
{
    /**
     * @param {HTMLCanvasElement} canvas - Canvas to draw on
     * @param {int} cellSize - Pixel size of the board cells
     */
    constructor(canvas, cellSize)
    {
        this.generation = 0;
        this.canvas = canvas;
        this.width = canvas.width / cellSize;
        this.height = canvas.height / cellSize;
        this.cell_size = cellSize;
        this.matrix = SparseMatrix.buildRandomMatrix(this.width, this.height);
    }

    /**
     * Calculate Next Generation
     * 
     * Takes the previous matrix state and determines
     * the state of the next generation.
     */
    _calcNextGeneration()
    {
        let next_gen = new SparseMatrix(this.width, this.height);
        for (let coords of this.matrix.iterate())
        {
            let live_count = 0;
            let neighbors = SparseMatrix.getNeighborCoords(coords[0], coords[1], this.width, this.height);
            for (let nCoords of neighbors)
            {
                if (this.matrix.cellFilled(nCoords[0], nCoords[1]))
                {
                    live_count++;
                } else if (this._doesCellReanimate(nCoords[0], nCoords[1]))
                {
                    next_gen.setCell(nCoords[0], nCoords[1]);
                }
            }

            if (live_count == 2 || live_count == 3 )
            {
                // Cell lives
                next_gen.setCell(coords[0], coords[1]);
            }
        }

        this.generation++;
        this.matrix = next_gen;
    }

    /**
     * Does Cell Reanimate
     * 
     * @param {int} x
     * @param {int} y
     * 
     * @returns {boolean} - Whether the cell should be alive in the next generation
     */
    _doesCellReanimate(x,y)
    {
        let live_count = 0;
        let neighbors = SparseMatrix.getNeighborCoords(x, y, this.width, this.height);
        for (let coords of neighbors)
        {
            if (this.matrix.cellFilled(coords[0], coords[1]))
            {
                live_count++;
            }
        }

        if (live_count === 3)
        {
            return true;
        }

        return false;
    }

    render()
    {
        let draw_context = this.canvas.getContext('2d');
        draw_context.fillStyle = 'black';
        draw_context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let coords of this.matrix.iterate())
        {
            draw_context.fillRect(coords[0]*this.cell_size, coords[1]*this.cell_size, this.cell_size, this.cell_size);
        }

        let status_text = "Gen: " + this.generation;

        draw_context.fillStyle = 'rgba(0,0,0,.8)';
        draw_context.fillRect(5, 5, (status_text.length*9), 30);

        draw_context.fillStyle = 'white';
        draw_context.font = '15px Arial';
        draw_context.fillText(status_text, 10, 25);

        this._calcNextGeneration();
    }
}