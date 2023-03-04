const canvasDimensions = {
    width: levelSize.width * Cell.size.width,
    height: levelSize.height * Cell.size.height,
}

const canvas = document.getElementById("grid");
canvas.width = canvasDimensions.width;
canvas.height = canvasDimensions.height;
const ctx = canvas.getContext("2d");

const grid = new Grid(level);

grid.drawGrid();