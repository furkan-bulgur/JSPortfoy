class GameStrategy{
    constructor(gameType){
        console.log(gameType);
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

class DFSOneFoodGameStrategy extends GameStrategy{
    constructor(){
        super(GameTypes.DFSOneFood);
    }

    getPacmanManager(pacman){
        return new PacmanManager(pacman, PacmanAITypes.DFS);
    }
}