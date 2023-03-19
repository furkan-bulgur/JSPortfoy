const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get("level")
const gameTypeStr = urlParams.get("mode")
const gameType = GameTypes[gameTypeStr];

const gameParameters = {
    visualizeCalculation: false,
}

const game = new Game(gameType, level);
game.startGame();

const visualizeCalculationButton = document.getElementById("visualize-calculation-button");
visualizeCalculationButton.onclick = visualizeCalculation;

function visualizeCalculation() {
    game.grid.resetCellColors();
    gameParameters.visualizeCalculation = !gameParameters.visualizeCalculation;
}