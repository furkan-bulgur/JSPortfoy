class SearchAlgorithm{
    getMovementDirection(){
        return null;
    }
}

class Minimax extends SearchAlgorithm{
    static maxDepth = 10;

    getMovementDirection(){   
        const currentState = Game.instance.getCurrentGameState();
        const startTime = new Date();
        console.log("Algorithm start");
        const [score, direction] = this.getMax(currentState, 0);
        const endTime = new Date();
        console.log("Algorithm end");
        console.log(`Time: ${endTime-startTime}`);
        return direction;
    }   

    getMax(state, depth){
        if(state.isTerminal()){
            return [state.score, null];
        }

        if(depth >= Minimax.maxDepth){
            const value = this.calculateHeuristicValue(state);
            return [value, null];
        }

        const possibleStatesAndDirections = state.getPossibleStatesForPacman();

        if(!possibleStatesAndDirections.length){
            return [state.score, null];
        }

        let maxScore = Number.NEGATIVE_INFINITY;
        let resultDirection = null;

        possibleStatesAndDirections.forEach(possibleStateAndDirection => {
            const [possibleState, direction] = possibleStateAndDirection;
            const score = this.getMin(possibleState, depth+1);
            if(score > maxScore){
                maxScore = score;
                resultDirection = direction;
            }
        });
        
        return [maxScore, resultDirection];
    }

    getMin(state, depth){
        if(state.isTerminal()){
            return state.score;
        }

        const possibleStates = state.getPossibleStatesForGhost(0);

        if(!possibleStates.length){
            return state.score;
        }

        let minScore = Number.POSITIVE_INFINITY;

        possibleStates.forEach(possibleState => {
            const [score, d] = this.getMax(possibleState, depth+1);
            if(score < minScore){
                minScore = score;
            }
        });
        
        return minScore;
    }

    calculateHeuristicValue(state){
        let maxDistance = 0;
        state.foodCoordinates.forEach(foodCoordinate=>{
            const distance = this.calculateManhattanDistance(state.pacmanCoordinate, foodCoordinate);
            if(distance > maxDistance){
                maxDistance = distance;
            }
        })
        return state.score + maxDistance * state.scoreProperties.moveScore + state.foodCoordinates.length * state.scoreProperties.eatScore;
    }

    calculateManhattanDistance(coor1, coor2){
        const distanceX = coor1.x - coor2.x;
        const distanceY = coor1.y - coor2.y;
        return Math.abs(distanceX) + Math.abs(distanceY);
    }
}