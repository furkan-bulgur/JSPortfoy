const canvasDimensions = {
    width: levelSize.width * Cell.size.width,
    height: levelSize.height * Cell.size.height,
}

const gameLoopInterval = 10;

const canvas = document.getElementById("grid");
canvas.width = canvasDimensions.width;
canvas.height = canvasDimensions.height;
const ctx = canvas.getContext("2d");

const startDirection = Directions.Left;

const grid = new Grid(level);
const pacman = new Pacman({
    startCell: grid.getCell({x: 1, y: 1}), 
    startDirection: startDirection,
});

const draw = () => {
    ctx.clearRect(0,0,canvasDimensions.width, canvasDimensions.height)
    grid.draw();
    pacman.draw();
}

const gameLoop = () => {
    draw()
}

const startGame = () => {
    setInterval(gameLoop, gameLoopInterval);
}

startGame();
