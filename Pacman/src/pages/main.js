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

const restartButton = document.getElementById("restart-button");
restartButton.onclick = restart;

function restart(){
    Game.instance.stopGame();
    Game.instance.resetGame();
    Game.instance.initializeGame(gameType, levelController);
    Game.instance.startGame();
}