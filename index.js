import GameBoard from './gameboard.js';

let board_canvas = document.getElementById("GameBoard");
let board = new GameBoard(board_canvas, 10);

setInterval(() => {
    board.render();
}, 500);