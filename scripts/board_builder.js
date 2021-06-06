import {dangerAreaProportionChoices} from "./settings.js";
import {swapTile} from "./event_handlers.js";


export function buildGame(boardHeight, boardLength, difficultyLevelChoice) {
    clearBoard("board");
    const dangerAreaProportion = dangerAreaProportionChoices[difficultyLevelChoice];
    const board = generateBoard(boardHeight, boardLength, dangerAreaProportion);
    board.addEventListener("click", swapTile, false);
    return document.getElementById("board").appendChild(board);
}

function clearBoard(boardId) {
    if (document.getElementById(boardId)) {
        document.getElementById(boardId).childNodes.forEach(element => element.remove());
    }
}

function generateBoard(boardHeight, boardLength, dangerAreaProportion) {
    const tilesCount = boardHeight * boardLength;
    const minesCount = tilesCount / 100 * dangerAreaProportion;
    const tiles = generateTilesArray(tilesCount, minesCount);
    const schema = generateSchema(tiles, boardHeight, boardLength);
    return generateTable(schema);
}

function generateTilesArray(tilesCount, minesCount) {
    const tilesArray = new Array(tilesCount).fill(0);
    while (minesCount > 0) {
        const targetCell = getRandomIndex(tilesCount);
        if (!tilesArray[targetCell]) {
            tilesArray[targetCell] = 100;
            minesCount--;
        }
    }
    return tilesArray;
}

function generateSchema(tiles, boardHeight, boardLength) {
    return Array.from(Array(parseInt(boardHeight)), () => tiles.splice(0, boardLength));
}

function generateTable(schema) {
    const table = document.createElement("table");
    const tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    for (let rowNum = 0; rowNum < schema.length; rowNum++) {
        const tableRow = document.createElement("tr");
        tableBody.appendChild(tableRow);
        for (let cellNum = 0; cellNum < schema[rowNum].length; cellNum++) {
            const cellElement = document.createElement("td");
            tableRow.appendChild(cellElement);
            updateCellParams(cellElement, schema, rowNum, cellNum);
        }
    }
    return table;
}

function getRandomIndex(max) {
    return Math.ceil(Math.random() * max) - 1;
}

function calculateDanger(schema, rowNum, cellNum) {
    let danger = 0;
    if (schema[rowNum][cellNum] !== 100) {
        if (cellNum > 0 && schema[rowNum][cellNum - 1] === 100) {
            danger++;
        }
        if (cellNum > 0 && rowNum > 0 && schema[rowNum - 1][cellNum - 1] === 100) {
            danger++;
        }
        if (rowNum > 0 && schema[rowNum - 1][cellNum] === 100) {
            danger++;
        }
        if (rowNum > 0 && schema[rowNum].length - 1 > cellNum && schema[rowNum - 1][cellNum + 1] === 100) {
            danger++;
        }
        if (schema[rowNum].length - 1 > cellNum && schema[rowNum][cellNum + 1] === 100) {
            danger++;
        }
        if (cellNum && schema.length - 1 > rowNum && schema[rowNum + 1][cellNum - 1] === 100) {
            danger++;
        }
        if (schema.length - 1 > rowNum && schema[rowNum + 1][cellNum] === 100) {
            danger++;
        }
        if (schema[rowNum].length - 1 > cellNum && schema.length - 1 > rowNum && schema[rowNum + 1][cellNum + 1] === 100) {
            danger++;
        }
    } else {
        danger = 100;
    }
    return danger;
}

function updateCellParams(cellElement, schema, rowNum, cellNum) {
    cellElement.className = "tile"
    cellElement.dataset.danger = calculateDanger(schema, rowNum, cellNum).toString();
    cellElement.dataset.coordinateY = rowNum.toString();
    cellElement.dataset.coordinateX = cellNum.toString();
}
