import GameBoard from './gameboard.js';
import {roundDown} from './lib.js';

let content_div = document.getElementsByClassName("content")[0];
let max_width = roundDown(content_div.clientWidth, 20) - 20;
let max_height = roundDown(content_div.clientHeight, 20) - 30;

let board_canvas = document.getElementById("GameBoard");
board_canvas.width = max_width;
board_canvas.height = max_height;

let board = new GameBoard(board_canvas, 10);

setInterval(() => {
    board.render();
}, 500);