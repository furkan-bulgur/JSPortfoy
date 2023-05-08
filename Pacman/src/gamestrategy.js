class GameStrategy{
    constructor(gameType){
        this.gameType = gameType;
        this.foodAmount = 1;
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
        return new ScoreManager(Game.instance.scoreProperties);
    }

    getFoodManager(grid){
        return new FoodManager(grid, this.foodAmount);
    }
}

class UserSimpleGhostOneFoodGameStrategy extends GameStrategy{
    constructor(){
        super(GameTypes.UserSimpleGhostOneFood);
        this.foodAmount = 5;
    }

    getPacmanManager(pacman){
        return new PacmanManager(pacman, PacmanAITypes.User);
    }
}

class MinimaxSimpleGhostOneFoodGameStrategy extends GameStrategy{
    constructor(){
        super(GameTypes.MinimaxSimpleGhostOneFood);
    }

    getPacmanManager(pacman){
        return new PacmanManager(pacman, PacmanAITypes.Minimax);
    }
}