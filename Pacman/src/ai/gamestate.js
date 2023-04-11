class GameState{
    constructor(pacmanCoordinate, ghostCoordinates, foodCoordinates, score){
        this.grid = Game.instance.grid;
        this.pacmanCoordinate = pacmanCoordinate;
        this.ghostCoordinates = ghostCoordinates;
        this.foodCoordinates = foodCoordinates;
        this.scoreProperties = Game.instance.levelModel.levelScoreProperties;
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
        const states = [];

        directions.forEach(direction => {
            const newScore = this.score + this.scoreProperties.moveScore;
            const newPacmanCoordinate = this.grid.getNeighborCoordinate(this.pacmanCoordinate, direction);
            const newFoodCoordinates = [];

            this.foodCoordinates.forEach(coordinate => {
                if(coordinate == newPacmanCoordinate){
                    newScore += this.scoreProperties.eatScore;
                }
                else{
                    newFoodCoordinates.push(coordinate);
                }
            });

            this.ghostCoordinates.forEach(ghostCoordinate => {
                if(ghostCoordinate == newPacmanCoordinate){
                    newScore = -1;
                }
            })        
            
            const newGameState = new GameState(newPacmanCoordinate, this.ghostCoordinates, newFoodCoordinates, newScore);

            states.push([newGameState, direction]);     
        })
        return states;
    }

    getPossibleStatesForGhost(index){
        const ghostCoordinate = this.ghostCoordinates[index];
        const newGhostCoordinates = [...this.ghostCoordinates];
        const newScore = this.score;
        const directions = this.getPossibleDirectionForCharacter(ghostCoordinate);
        const states = [];

        directions.forEach(direction => {
            const newGhostCoordinate = this.grid.getNeighborCoordinate(ghostCoordinate, direction);
            newGhostCoordinates[index] = newGhostCoordinate;

            if(newGhostCoordinate == this.pacmanCoordinate){
                newScore = -1;
            }

            states.push(new GameState(this.pacmanCoordinate, newGhostCoordinates, this.foodCoordinates, newScore));
        });

        return states;
    }

    isTerminal(){
        return !this.foodCoordinates.length || this.score < 0;
    }
}
