const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get("level")

const game = new Game(level);
game.startGame();