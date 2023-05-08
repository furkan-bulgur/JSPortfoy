class LevelController{
    constructor(gameType){
        this.setLevels(gameType);
        this.selectedLevelModel = null;
    }

    setLevels(gameType){
        this.levelModels = [];
        switch (gameType) {
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
            case GameTypes.UserSimpleGhostOneFood:
            case GameTypes.MinimaxSimpleGhostOneFood:
                return 1;
        }
    }

    selectLevel(levelIndex){
        this.selectedLevelModel = this.levelModels[levelIndex];
    }
}