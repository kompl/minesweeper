import {startGame, swapTile} from "./event_handlers.js";


const startGameButton = document.getElementById("gameMenu");
const board = document.getElementById("board");


startGameButton.addEventListener("click", startGame, false);
board.addEventListener("click", swapTile, false);
