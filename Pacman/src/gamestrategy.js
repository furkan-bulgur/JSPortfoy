class GameStrategy{
    constructor(gameType){
        this.gameType = gameType;
        this.setGameModel();
    }

    setGameModel(){
        gameModels.forEach(model => {
            if(model.type == this.gameType){
                this.gameModel = model;
            }
        });
    }

    getScoreManager(){
        return new ScoreManager(this.gameModel.scoreProperties);
    }
}

class UserOneFoodGameStrategy extends GameStrategy{
    constructor(){
        super(GameTypes.UserOneFood);
    }

    getPacmanManager(game, pacman){
        return new PacmanManager(game, pacman, PacmanAITypes.User);
    }
}

class BFSOneFoodGameStrategy extends GameStrategy{
    constructor(){
        super(GameTypes.BFSOneFood);
    }

    getPacmanManager(game, pacman){
        return new PacmanManager(game, pacman, PacmanAITypes.BFS);
    }
}

class AStarOneFoodGameStrategy extends GameStrategy{
    constructor(){
        super(GameTypes.AStarOneFood);
    }

    getPacmanManager(game, pacman){
        return new PacmanManager(game, pacman, PacmanAITypes.AStar);
    }
}