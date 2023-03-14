const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("score");

class ScoreManager{
    constructor(scoreChanges, score, text){
        this.scoreChanges = scoreChanges;
        this.score = score;
        this.text = text;
        this.text.innerText = `SCORE: ${this.score}`;
    }
    
    changeScore(reason){
        let change = 0;
        switch (reason) {
            case ScoreChangeReason.Move:
                change = this.scoreChanges.moveScore;
                break;
            case ScoreChangeReason.Eat:
                change = this.scoreChanges.eatScore;
                break;
            default:
                break;
        }
        this.score += change;
        console.log(this.score);
        this.text.innerText = `SCORE: ${this.score}`;
    }
}

class Game{
    static startDirection = Directions.Right;

    constructor(levelIndex){
        this.levelModel = levelModels[levelIndex];
        this.grid = new Grid(this.levelModel.level, this.levelModel.levelSize);
        this.pacman = new Pacman({
            startCell: this.grid.pacmanStartCell, 
            startDirection: Game.startDirection,
        });
        this.scoreManager = new ScoreManager(this.levelModel.levelScoreProperties, this.levelModel.score, scoreText);
        this.setCanvas();
    }

    startGame(){
        const loop = (game) => () => (game.gameLoop())
        setInterval(loop(this), gameLoopInterval);
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
        this.pacman.update();
        this.grid.foodManager.update();
    }

    gameLoop(){
        this.update();
        this.draw(); 
    }
}