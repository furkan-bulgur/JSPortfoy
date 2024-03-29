const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

class Game{
    static #instance;
    static instance = Game.#instance ? Game.#instance : new Game();
    static startDirection = Directions.Right;
    static gameLoopInterval = 20;
    static aiUpdateInterval = 250;

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
        this.scoreProperties = this.levelModel.levelScoreProperties;
        this.levelData = new LevelData(this.levelModel.level, this.levelModel.levelSize);
        this.grid = new Grid(this.levelData);

        this.initializePacman();
        this.initializeGhosts();
        
        this.setManagers();
        this.setCanvas();
    }

    initializePacman(){
        if(!this.levelData.pacmanCoordinate) return;
        this.pacman = new Pacman(this.grid.getCell(this.levelData.pacmanCoordinate), Game.startDirection);
        this.pacmanManager = this.gameStrategy.getPacmanManager(this.pacman);
    }

    initializeGhosts(){
        this.ghosts = []
        this.ghostManagers = [];
        this.levelData.ghosts.forEach(ghost => {
            const ghostInstance = new Ghost(this.grid.getCell(ghost[0]), Game.startDirection);
            this.ghosts.push(ghostInstance);
            this.ghostManagers.push(new GhostManager(ghostInstance, ghost[1]));
        });
    }

    setGameStrategy(){
        switch(this.gameType){
            case GameTypes.UserSimpleGhostOneFood:
                this.gameStrategy = new UserSimpleGhostOneFoodGameStrategy();
                break;
            case GameTypes.MinimaxSimpleGhostOneFood:
                this.gameStrategy = new MinimaxSimpleGhostOneFoodGameStrategy();
                break;
        }
    }

    setManagers(){
        this.scoreManager = this.gameStrategy.getScoreManager();
        this.foodManager = this.gameStrategy.getFoodManager(this.grid);
    }
    
    getCurrentGameState(){
        const ghostAIStateCopies = this.ghostManagers.map(ghostManager => ghostManager.ghostAI.createAIStateCopy());
        const foodCoordinates = this.foodManager.foodCells.map(cell => cell.coordinate);

        return new GameState(this.pacman.currentCell.coordinate, ghostAIStateCopies, foodCoordinates, this.scoreManager.score);
    }

    onScoreBecomeZeroOrLower(){
        this.loseGame();
    }

    onAllFoodsAreEaten(){
        this.winGame();
    }

    startGame(){
        const loop = (game) => () => (game.gameLoop())
        const aiUpdate = (game) => () => (game.aiUpdate());
        this.loopInterval = setInterval(loop(this), Game.gameLoopInterval);
        this.aiInterval = setInterval(aiUpdate(this), Game.aiUpdateInterval);
    }

    stopGame(){
        clearInterval(this.loopInterval);
        clearInterval(this.aiInterval);
    }

    resetGame(){
        this.foodManager.reset();
    }

    loseGame(){
        this.stopGame();
        this.scoreManager.showGameOverText();
    }

    winGame(){
        this.stopGame();
        this.scoreManager.showGameWonText();
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