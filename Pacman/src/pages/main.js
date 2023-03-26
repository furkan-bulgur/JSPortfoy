const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get("level")
const gameTypeStr = urlParams.get("mode")
const gameType = GameTypes[gameTypeStr];

const gameParameters = {
    visualizeCalculation: false,
}

const levelController = new LevelController(gameType);
levelController.selectLevel(level)
Game.instance.initializeGame(gameType, levelController);
Game.instance.startGame();

const visualizeCalculationButton = document.getElementById("visualize-calculation-button");
visualizeCalculationButton.onclick = visualizeCalculation;

function visualizeCalculation() {
    Game.instance.grid.resetCellColors();
    gameParameters.visualizeCalculation = !gameParameters.visualizeCalculation;
}