const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

class Game{
    static #instance;
    static instance = Game.#instance ? Game.#instance : new Game();
    static startDirection = Directions.Right;

    constructor(){
        Game.#instance = this;
    }

    initializeGame(gameType, levelIndex){
        this.gameType = gameType;
        this.setGameStrategy();
        this.levelModel = levelModels[levelIndex];
        this.grid = new Grid(this.levelModel.level, this.levelModel.levelSize);
        this.pacman = new Pacman(this.grid.pacmanStartCell, Game.startDirection);
        this.ghost = new Ghost(this.grid.pacmanStartCell, Game.startDirection);
        this.sizeProperties = {
            pacmanRad: Pacman.radius

        }
        this.updateListeners = [];
        this.setManagers();
        this.setCanvas();
    }

    addUpdateListener(listener){
        this.updateListeners.push(listener);
    }

    removeUpdateListener(listener){
        this.updateListeners = this.updateListeners.filter(l => l != listener);
    }

    setGameStrategy(){
        switch(this.gameType){
            case GameTypes.UserOneFood:
                this.gameStrategy = new UserOneFoodGameStrategy();
                break;
            case GameTypes.BFSOneFood:
                this.gameStrategy = new BFSOneFoodGameStrategy();
                break;
            case GameTypes.AStarOneFood:
                this.gameStrategy = new AStarOneFoodGameStrategy();
                break;
        }
    }

    setManagers(){
        this.scoreManager = this.gameStrategy.getScoreManager();
        this.pacmanManager = this.gameStrategy.getPacmanManager(this.pacman);
        this.foodManager = this.gameStrategy.getFoodManager(this.grid);
    }

    startGame(){
        const loop = (game) => () => (game.gameLoop())
        const aiUpdate = (game) => () => (game.aiUpdate());
        this.loopInterval = setInterval(loop(this), gameLoopInterval);
        this.aiInterval = setInterval(aiUpdate(this), aiUpdateInterval);
    }

    stopGame(){
        clearInterval(this.loopInterval);
        clearInterval(this.aiInterval);
    }

    setCanvas(){
        this.canvasDimensions = {
            width: this.levelModel.levelSize.width * Cell.size.width,
            height: this.levelModel.levelSize.height * Cell.size.height,
        }

        canvas.width = this.canvasDimensions.width;
        canvas.height = this.canvasDimensions.height;
    }

    draw(){
        ctx.clearRect(0,0,this.canvasDimensions.width, this.canvasDimensions.height)
        this.grid.draw();
        this.pacman.draw();
        // this.ghost.draw();
    }

    update(){
        this.pacman.update();
        this.foodManager.update();

        this.updateListeners.forEach(listener => {
            listener.update();
        });
    }

    aiUpdate(){
        this.pacmanManager.aiUpdate();
    }

    gameLoop(){
        this.update();
        this.draw(); 
    }
}