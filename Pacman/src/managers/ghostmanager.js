class GhostManager{
    constructor(ghost, type){
        this.type = type;
        this.setGhostAI(ghost);
        Game.instance.addAIUpdateListener(this);
    }

    setGhostAI(ghost){
        switch(this.type){
            case GhostAITypes.None:
                this.ghostAI = new NoneGhostAI(ghost);
                break;
            case GhostAITypes.Vertical:
                this.ghostAI = new VerticalGhostAI(ghost);
                break;
            case GhostAITypes.Horizontal:
                this.ghostAI = new HorizontalGhostAI(ghost);
                break;
        }
    }

    aiUpdate(){
        if(this.ghostAI != null){
            this.ghostAI.aiUpdate();
        }
    }
}