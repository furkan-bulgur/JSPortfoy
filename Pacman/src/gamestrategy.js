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

    getFoodManager(grid){
        return new FoodManager(grid)
    }
}

class UserOneFoodGameStrategy extends GameStrategy{
    constructor(){
        super(GameTypes.UserOneFood);
    }

    getPacmanManager(pacman){
        return new PacmanManager(pacman, PacmanAITypes.User);
    }
}

class BFSOneFoodGameStrategy extends GameStrategy{
    constructor(){
        super(GameTypes.BFSOneFood);
    }

    getPacmanManager(pacman){
        return new PacmanManager(pacman, PacmanAITypes.BFS);
    }
}

class AStarOneFoodGameStrategy extends GameStrategy{
    constructor(){
        super(GameTypes.AStarOneFood);
    }

    getPacmanManager(pacman){
        return new PacmanManager(pacman, PacmanAITypes.AStar);
    }
}

class UserSimpleGhostOneFoodGameStrategy extends GameStrategy{
    constructor(){
        super(GameTypes.UserSimpleGhostOneFood);
    }

    getPacmanManager(pacman){
        return new PacmanManager(pacman, PacmanAITypes.User);
    }
}