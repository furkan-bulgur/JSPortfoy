const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

class Game{
    static startDirection = Directions.Right;

    constructor(gameType, levelIndex){
        this.gameType = gameType;
        this.setGameStrategy();
        this.levelModel = levelModels[levelIndex];
        this.grid = new Grid(this.levelModel.level, this.levelModel.levelSize);
        this.pacman = new Pacman({
            startCell: this.grid.pacmanStartCell, 
            startDirection: Game.startDirection,
        });
        this.setManagers();
        this.setCanvas();
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
        this.pacmanManager = this.gameStrategy.getPacmanManager(this, this.pacman);
    }

    startGame(){
        const loop = (game) => () => (game.gameLoop())
        this.interval = setInterval(loop(this), gameLoopInterval);
    }

    stopGame(){
        clearInterval(this.interval);
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
    }

    update(){
        this.pacmanManager.update();
        this.pacman.update();
        this.grid.foodManager.update();
    }

    gameLoop(){
        this.update();
        this.draw(); 
    }
}