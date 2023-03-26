class PacmanManager{
    constructor(pacman, type){
        this.type = type;
        this.setController(pacman);
    }
    
    setController(pacman){
        if(this.type == PacmanAITypes.User){
            this.movementController = new PacmanUser(pacman);
        }
        else{
            this.movementController = new PacmanAI(pacman, this.type);
        }
    }

    aiUpdate(){
        if(this.movementController != null && this.type != PacmanAITypes.User){
            this.movementController.aiUpdate();
        }
    }
}