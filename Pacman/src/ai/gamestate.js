class GameState{
    constructor(pacmanCoordinate, ghostCoordinates, foodCoordinates, score){
        this.grid = Game.instance.grid;
        this.pacmanCoordinate = pacmanCoordinate;
        this.ghostCoordinates = ghostCoordinates;
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
                newGameState = new GameState(this.pacmanCoordinate, this.ghostCoordinates, this.foodCoordinates, newScore);
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

            this.ghostCoordinates.forEach(ghostCoordinate => {
                if(this.isCoordinatesEqual(ghostCoordinate, newPacmanCoordinate)){
                    newScore = -1;
                }
            })        
            
            newGameState = new GameState(newPacmanCoordinate, this.ghostCoordinates, newFoodCoordinates, newScore);

            states.push([newGameState, direction]);     
        });
        return states;
    }

    getPossibleStatesForGhost(index){
        const ghostCoordinate = this.ghostCoordinates[index];
        const newGhostCoordinates = [...this.ghostCoordinates];
        let newScore = this.score;
        const directions = this.getPossibleDirectionForCharacter(ghostCoordinate);
        const states = [];

        directions.forEach(direction => {
            const newGhostCoordinate = this.grid.getNeighborCoordinate(ghostCoordinate, direction);
            newGhostCoordinates[index] = newGhostCoordinate;

            if(this.isCoordinatesEqual(newGhostCoordinate, this.pacmanCoordinate)){
                newScore = -1;
            }

            states.push(new GameState(this.pacmanCoordinate, newGhostCoordinates, this.foodCoordinates, newScore));
        });

        return states;
    }

    isTerminal(){
        return !this.foodCoordinates.length || this.score <= 0;
    }

    isCoordinatesEqual(coor1, coor2){
        return coor1.x == coor2.x && coor1.y == coor2.y;
    }
}
