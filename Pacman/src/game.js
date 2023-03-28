const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

class Game{
    static #instance;
    static instance = Game.#instance ? Game.#instance : new Game();
    static startDirection = Directions.Right;

    constructor(){
        Game.#instance = this;
    }

    initializeGame(gameType, levelController){
        this.updateListeners = [];
        this.aiUpdateListeners = [];
        this.drawListeners = [];

        this.gameType = gameType;
        this.levelController = levelController;
        this.setGameStrategy();
        this.levelModel = levelController.selectedLevelModel;
        this.levelData = new LevelData(this.levelModel.level, this.levelModel.levelSize);
        this.grid = new Grid(this.levelData);

        this.initializePacman();
        this.initializeGhost();
        
        this.setManagers();
        this.setCanvas();
    }

    initializePacman(){
        if(!this.levelData.pacmanCoor) return;
        this.pacman = new Pacman(this.grid.getCell(this.levelData.pacmanCoor), Game.startDirection);
        this.pacmanManager = this.gameStrategy.getPacmanManager(this.pacman);
    }

    initializeGhost(){
        if(!this.levelData.ghostCoor) return;
        this.ghost = new Ghost(this.grid.getCell(this.levelData.ghostCoor), Game.startDirection);
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
            case GameTypes.UserSimpleGhostOneFood:
                this.gameStrategy = new UserSimpleGhostOneFoodGameStrategy();
                break;
        }
    }

    setManagers(){
        this.scoreManager = this.gameStrategy.getScoreManager();
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

    resetGame(){
        this.foodManager.reset();
    }

    gameOver(){
        this.stopGame();
        this.scoreManager.showGameOverText();
    }

    setCanvas(){
        this.canvasDimensions = {
            width: this.levelModel.levelSize.width * Cell.size.width,
            height: this.levelModel.levelSize.height * Cell.size.height,
        }

        canvas.width = this.canvasDimensions.width;
        canvas.height = this.canvasDimensions.height;
    }

    addUpdateListener(listener){
        this.updateListeners.push(listener);
    }

    removeUpdateListener(listener){
        this.updateListeners = this.updateListeners.filter(l => l != listener);
    }

    addAIUpdateListener(listener){
        this.aiUpdateListeners.push(listener);
    }

    removeAIUpdateListener(listener){
        this.aiUpdateListeners = this.updateListeners.filter(l => l != listener);
    }

    addDrawListener(listener){
        this.drawListeners.push(listener);
    }
    
    removeDrawListener(listener){
        this.drawListeners = this.drawListeners.filter(l => l != listener);
    }

    draw(){
        ctx.clearRect(0,0,this.canvasDimensions.width, this.canvasDimensions.height);
        this.drawListeners.forEach(drawable => drawable.draw());
    }

    update(){
        this.updateListeners.forEach(listener => listener.update());
    }

    aiUpdate(){
        this.scoreManager.changeScore(ScoreChangeReason.Tick);
        this.aiUpdateListeners.forEach(listener => listener.aiUpdate());
    }

    gameLoop(){
        this.update();
        this.draw(); 
    }
}