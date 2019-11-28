import {getRandomInt} from './lib.js';

export default class SparseMatrix 
{
    /**
     * @param {int} width - Width of the matrix
     * @param {int} height - Height of the matrix
     */
    constructor(width, height)
    {
        this.width = width;
        this.height = height;
        this.matrix = [];
    }

    /**
     * Iterate Matrix
     * 
     * @returns {Iterable} - Iterable containing coordinate arrays to loop over
     */
    iterate()
    {
        let _this = this;
        return function* ()
        {
            for (let idx in _this.matrix)
            {
                yield _this._intCoords(idx);
            }
        }();
    }

    /**
     * Checks If Cell is Occupied
     * 
     * @param {int} x 
     * @param {int} y 
     */
    cellFilled(x,y)
    {
        this._checkCoordConstraints(x,y);
        let coords = this._strCoords(x,y);
        return coords in this.matrix;
    }

    /**
     * Set Cell as Occupied
     * 
     * @param {int} x 
     * @param {int} y
     */
    setCell(x,y)
    {
        this._checkCoordConstraints(x,y)
        let coords = this._strCoords(x,y);
        this.matrix[ coords ] = true;
    }

    /**
     * Convert to String Coordinates
     * 
     * @param {int} x 
     * @param {int} y 
     * 
     * @returns {string} - Coordinates in "X,Y" form
     */
    _strCoords(x,y)
    {
        return x + "," + y;
    }

    /**
     * Convert to Int Coordinates
     * 
     * @param {string} coords
     * 
     * @returns {array} - Coordinates in an array. Two values: X (0) and Y (1)
     */
    _intCoords(coords)
    {
        coords = coords.split(",");
        return [parseInt(coords[0]), parseInt(coords[1])];
    }

    /**
     * Check Coordinate Constraints
     * 
     * @param {int} x 
     * @param {int} y
     * 
     * @returns {boolean} - Whether the provided coordinates were out of bounds 
     */
    _checkCoordConstraints(x,y)
    {
        if (x > (this.width - 1) || x < 0)
        {
            throw Error(x + " (X) index out of range, max: " + (this.width - 1));
        }

        if (y > (this.height - 1) || y < 0) {
            throw Error(y + " (Y) index out of range, max: " + (this.height - 1));
        }
    }

    /**
     * Build Random Matrix
     * 
     * Generates a new SparseMatrix object.
     * Each cell has a 50/50 chance of being populated.
     * 
     * @param {int} width - Number of columns in the matrix
     * @param {int} height - Number of rows in the matrix
     * 
     * @returns {SparseMatrix}
     */
    static buildRandomMatrix(width, height)
    {
        let matrix = new SparseMatrix(width, height);
        for (let x = 0; x < width; x++)
        {
            for (let y = 0; y < height; y++)
            {
                if (getRandomInt(2) === 1)
                {
                    matrix.setCell(x,y);
                }
            }
        }
        return matrix;
    }

    /**
     * Get Neighbor Coordinates
     * 
     * @param {int} x - X coordinate of the matrix cell
     * @param {int} y - Y coordinate of the matrix cell
     * 
     * @returns {array} - Array of neighbor coordinates
     *                    Each neighbor coordinate array has two values X (0) and Y (1)
     */
    static getNeighborCoords(x, y, width, height)
    {
        let neighbors = [];
        for (let xMod = -1; xMod < 2; xMod++) {
            for (let yMod = -1; yMod < 2; yMod++) {
                if (xMod == 0 && yMod == 0) {
                    // Skip, this is the resident cell we are checking
                    continue;
                }

                let nX = x + xMod;
                nX = nX < 0 ? width - 1 : nX;
                nX = nX > (width - 1) ? 0 : nX;

                let nY = y + yMod;
                nY = nY < 0 ? height - 1 : nY;
                nY = nY > (height - 1) ? 0: nY;

                neighbors.push([nX, nY]);
            }
        }

        return neighbors;
    }
}