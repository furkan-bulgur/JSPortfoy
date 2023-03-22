class PacmanManager{
    constructor(game, pacman, type){
        this.game = game;
        this.type = type;
        this.setController(pacman);
    }
    
    setController(pacman){
        if(this.type == PacmanAITypes.User){
            this.movementController = new PacmanUser(pacman);
        }
        else{
            this.movementController = new PacmanAI(this.game.grid.foodManager, pacman, this.type);
        }
    }

    update(){
        if(this.movementController != null && this.type != PacmanAITypes.User){
            this.movementController.update();
        }
    }
}