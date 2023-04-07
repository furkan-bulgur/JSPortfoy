class LevelController{
    constructor(gameType){
        this.setLevels(gameType);
        this.selectedLevelModel = null;
    }

    setLevels(gameType){
        this.levelModels = [];
        switch (gameType) {
            case GameTypes.UserOneFood:
            case GameTypes.BFSOneFood:
            case GameTypes.BFSMultipleFood:
            case GameTypes.AStarOneFood:
                this.levelModels = [levelModel1,levelModel2,levelModel3,levelModel4,levelModel5]
                break;
            case GameTypes.UserSimpleGhostOneFood:
            case GameTypes.MinimaxSimpleGhostOneFood:
                this.levelModels = [levelModel6]
                break;
            default:
                break;
        }
    }

    static getLevelCount(gameType){
        switch (gameType) {
            case GameTypes.UserOneFood:
            case GameTypes.BFSOneFood:
            case GameTypes.BFSMultipleFood:
            case GameTypes.AStarOneFood:
                return 5;
            case GameTypes.UserSimpleGhostOneFood:
            case GameTypes.MinimaxSimpleGhostOneFood:
                return 1;
        }
    }

    selectLevel(levelIndex){
        this.selectedLevelModel = this.levelModels[levelIndex];
    }
}