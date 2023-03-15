const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get("level")

const gameParameters = {
    visualizeCalculation: false,
}

const game = new Game(level);
game.startGame();

const visualizeCalculationButton = document.getElementById("visualize-calculation-button");
visualizeCalculationButton.onclick = visualizeCalculation;

function visualizeCalculation() {
    game.grid.resetCellColors();
    gameParameters.visualizeCalculation = !gameParameters.visualizeCalculation;
}

const pacmanAIUserControllerButton = document.getElementById("pacmanAI-user-controller-button");
const pacmanAIBFSControllerButton = document.getElementById("pacmanAI-BFS-controller-button");

pacmanAIUserControllerButton.onclick = UserController;
pacmanAIBFSControllerButton.onclick = BFSController;

function UserController(){
    if(game.pacman.manager.type != PacmanAITypes.User){
        game.pacman.manager.type = PacmanAITypes.User;
        game.pacman.manager.setController();
    }
}

function BFSController(){
    if(game.pacman.manager.type != PacmanAITypes.BFS){
        game.pacman.manager.type = PacmanAITypes.BFS;
        game.pacman.manager.setController();
    }
}