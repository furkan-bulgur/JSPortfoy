class GameState{
    static IsGhostAIKnown = true;

    constructor(pacmanCoordinate, ghostAIStates, foodCoordinates, score){
        this.grid = Game.instance.grid;
        this.pacmanCoordinate = pacmanCoordinate;
        this.ghostAIStates = ghostAIStates;
        this.foodCoordinates = foodCoordinates;
        this.scoreProperties = Game.instance.scoreProperties;
        this.score = score;
    }

    getPossibleDirectionForCharacter(characterCoordinate){
        const directions = [Directions.Up, Directions.Down, Directions.Right, Directions.Left];
        return directions.filter(direction => {
            const neighbor = this.grid.getNeighborCoordinate(characterCoordinate, direction);
            return neighbor != null && this.grid.getCell(neighbor).type != CellTypes.Wall;
        })
    }

    getPossibleStatesForPacman(){
        const directions = this.getPossibleDirectionForCharacter(this.pacmanCoordinate);
        directions.push(null);
        const states = [];

        directions.forEach(direction => {
            let newScore = this.score + this.scoreProperties.moveScore;
            let newGameState = null;
            if(!direction){
                newGameState = new GameState(this.pacmanCoordinate, this.ghostAIStates, this.foodCoordinates, newScore);
                states.push([newGameState, direction]);     
                return;
            }

            const newPacmanCoordinate = this.grid.getNeighborCoordinate(this.pacmanCoordinate, direction);
            const newFoodCoordinates = [];

            this.foodCoordinates.forEach(coordinate => {
                if(this.isCoordinatesEqual(coordinate, newPacmanCoordinate)){
                    newScore += this.scoreProperties.eatScore;
                }
                else{
                    newFoodCoordinates.push(coordinate);
                }
            });

            this.ghostAIStates.forEach(ghostAIState => {
                const ghostCoordinate = ghostAIState.ghost.currentCell.coordinate;
                if(this.isCoordinatesEqual(ghostCoordinate, newPacmanCoordinate)){
                    newScore = -1;
                }
            })        
            
            newGameState = new GameState(newPacmanCoordinate, this.ghostAIStates, newFoodCoordinates, newScore);

            states.push([newGameState, direction]);     
        });
        return states;
    }

    getPossibleStatesForGhost(index){
        if(GameState.IsGhostAIKnown){
            const ghostAIState = this.ghostAIStates[index];
            const newGhostAIStates = [...this.ghostAIStates];
            let newScore = this.score;

            const ghostCell = ghostAIState.ghost.currentCell;
            const nextDirection = newGhostAIStates[index].getNextDirection(); //With each next called ghost is believed to be moved

            const newGhostCell = ghostCell.neighborCells[nextDirection];
            newGhostAIStates[index].ghost.currentCell = newGhostCell;

            if(this.isCoordinatesEqual(newGhostCell.coordinate, this.pacmanCoordinate)){
                newScore = -1;
            }

            const states = [];
            states.push(new GameState(this.pacmanCoordinate, newGhostAIStates, this.foodCoordinates, newScore));
            return states;
        }
        else{
            const ghostAIState = this.ghostAIStates[index];
            const newGhostAIStates = [...this.ghostAIStates];
            const ghostCell = ghostAIState.ghost.currentCell;
            let newScore = this.score;
            const directions = this.getPossibleDirectionForCharacter(ghostCoordinate);
            const states = [];
    
            directions.forEach(direction => {
                const newGhostCell = ghostCell.neighborCells[direction];
                newGhostAIStates[index].ghost.currentCell = newGhostCell;
    
                if(this.isCoordinatesEqual(newGhostCell.coordinate, this.pacmanCoordinate)){
                    newScore = -1;
                }
    
                states.push(new GameState(this.pacmanCoordinate, newGhostAIStates, this.foodCoordinates, newScore));
            });
    
            return states;
        }
    }

    isTerminal(){
        return !this.foodCoordinates.length || this.score <= 0;
    }

    isCoordinatesEqual(coor1, coor2){
        return coor1.x == coor2.x && coor1.y == coor2.y;
    }
}
