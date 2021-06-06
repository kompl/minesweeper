import {buildGame} from "./board_builder.js";
import {dangerColor} from "./settings.js";


export function startGame() {
    buildGame(
        document.getElementById("boardHeight").value,
        document.getElementById("boardLength").value,
        document.querySelector("input[name=\"difficultyLevelChoice\"]:checked").value
    );
}


export function swapTile(event) {
    if (event.target.className === "tile") {
        event.target.style =
            "transition: background-color 300ms cubic-bezier(0, 0, 1, 1); " +
            "animation: none; " +
            "background-color: " + dangerColor[event.target.dataset.danger];
        if (event.target.dataset.danger !== "100") {
            event.target.innerHTML = event.target.dataset.danger;
        }
    }
}
