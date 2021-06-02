import {dangerAreaProportionChoices} from "./settings.js"
import {secondsCountByDifficulty} from "./settings.js";
import {dangerColor} from "./settings.js";

export let DifficultyLevel = class {
    constructor(difficultyLevelChoice) {
        this.difficultyLevelChoice = difficultyLevelChoice;
    }

    get dangerAreaProportion() {
        return dangerAreaProportionChoices[this.difficultyLevelChoice]
    }

    get timeToPass() {
        return secondsCountByDifficulty[this.difficultyLevelChoice]
    }
}

export function generateBoard(boardHeight, boardLength, dangerAreaProportion) {
    let tilesCount = boardHeight * boardLength;
    let minesCount = tilesCount / 100 * dangerAreaProportion
    let tiles = generateTilesArray(tilesCount, minesCount)
    let schema = generateSchema(tiles, boardHeight, boardLength)
    return generateTable(schema)
}

function generateTilesArray(tilesCount, minesCount) {
    let tilesArray = new Array(tilesCount).fill(0)
    while (minesCount > 0) {
        let targetCell = getRandomIndex(tilesCount)
        if (!tilesArray[targetCell]) {
            tilesArray[targetCell] = 100
            minesCount--
        }
    }
    return tilesArray
}

function generateSchema(tiles, boardHeight, boardLength) {
    let schema = new Array(boardHeight)
    for (let i = 0; i < boardHeight; i++) {
        schema[i] = tiles.splice(0, boardLength)
    }
    return schema
}

function generateTable(schema) {
    console.log(schema)
    let table = document.createElement("table");
    let tableBody = document.createElement('tbody');
    table.appendChild(tableBody);
    for (let row = 0; row < schema.length; row++) {
        let tableRow = document.createElement("tr");
        tableBody.appendChild(tableRow);
        for (let cell = 0; cell < schema[row].length; cell++) {
            let cellElement = document.createElement("td");
            let danger = calculateDanger(schema, row, cell);
            cellElement.onclick = function() { swapTile(this, danger); };
            tableRow.appendChild(cellElement);
        }
    }
    return table
}

function getRandomIndex(max) {
    return Math.ceil(Math.random() * max) - 1;
}

function calculateDanger(schema, y, x) {
    let danger = 0
    if (schema[x][y] !== 100) {
        if (x && schema[x-1][y] === 100) {danger++}
        if (x && y && schema[x-1][y-1] === 100) {danger++}
        if (y && schema[x][y-1] === 100) {danger++}
        if (y && schema[y].length - 1 > x && schema[x+1][y-1] === 100) {danger++}
        if (schema[y].length - 1 > x && schema[x+1][y] === 100) {danger++}
        if (x && schema.length - 1 > y && schema[x-1][y+1] === 100) {danger++}
        if (schema.length - 1 > y && schema[x][y+1] === 100) {danger++}
        if (schema[y].length - 1 > x && schema.length - 1 > y && schema[x+1][y+1] === 100) {danger++}
    } else {
        danger = 100
    }
    return danger
}

function swapTile(cell, hasMine) {
    cell.style = "background-color: " + dangerColor[hasMine]
    if (hasMine !== 100) {
        cell.innerHTML = hasMine
    }
    return cell
}
