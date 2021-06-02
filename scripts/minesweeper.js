import {DifficultyLevel} from "./board.js";
import {generateBoard} from "./board.js";

window.startGameMessage =  function startGame(boardHeight, boardLength, difficultyLevelChoice) {
    clearBoard("board")
    let difficultyLevel = new DifficultyLevel(difficultyLevelChoice)
    console.log(difficultyLevelChoice)
    let board = generateBoard(boardHeight, boardLength, difficultyLevel.dangerAreaProportion)

    return document.getElementById("board").appendChild(board)
}

function clearBoard(boardId) {
    if (document.getElementById(boardId)) {
        document.getElementById(boardId).childNodes.forEach(element => element.remove());
    }
}