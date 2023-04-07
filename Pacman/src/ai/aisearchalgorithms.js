class SearchAlgorithm{
    getMovementDirection(pacman){
        return null;
    }
}

class PathSearchAlgorithm extends SearchAlgorithm{
    constructor(){
        super();
        this.path = [];
        this.visitedList = [];
        this.visualizer = new PathVisualizer();
    }

    getMovementDirection(pacman){
        return this.getNextDirection(pacman);
    }

    calculatePath(pacmanCell){
        let searchResult;
        if(Game.instance.foodManager.foodAmount > 1){
            searchResult = this.searchPathToAllFoods(pacmanCell);
        }
        else{
            searchResult = this.searchPathToFood(pacmanCell);
            this.visitedList = searchResult.visitedList;
        }
        this.path = searchResult.path;
    }

    getNextDirection(pacman){
        let direction = null;
        if(!this.path.length){
            this.visualizer.endVisualization();
            this.calculatePath(pacman.currentCell);
            this.visualizer.tryStartVisualization(this.path, this.visitedList);
        }

        if(this.visualizer.isVisualizationFinished && this.path.length){
            let nextCell = this.path.pop();
            if(nextCell == pacman.currentCell){
                nextCell = this.path.pop();
            }
            direction = this.getDirectionToCell(nextCell, pacman)
        }
        return direction;
    }

    getDirectionToCell(targetCell, pacman){
        let resultDirection = null;
        const pacmanCell = pacman.currentCell;
        Object.keys(pacmanCell.neighborCells).forEach(direction => {
            if(pacmanCell.neighborCells[direction] == targetCell){
                resultDirection = direction;
            }
        });
        return resultDirection;
    }
}

class BFS extends PathSearchAlgorithm{
    searchPathToFood(startCell){
        let frontier = [[null, startCell]];
        let visitedPathTree = new PathTree();
        let visitedVisualizationList = [];

        while(frontier.length > 0){
            let [parent, currentCell] = frontier.shift();

            if(visitedPathTree.has(currentCell)) continue;
            visitedPathTree.add(parent, currentCell, -1);
            visitedVisualizationList.push(currentCell);

            if(currentCell.hasFood){
                return {
                    path: PathTreePathFinder.getPathFromRoot(visitedPathTree, currentCell),
                    visitedList: visitedVisualizationList,
                };
            }
            
            currentCell.getNeighborCellsWithType(CellTypes.Empty).forEach(cell => {
                if(!visitedPathTree.has(cell)) {
                    frontier.push([currentCell, cell]);
                }
            });
        }

        return {
            path: [],
            visitedList: visitedVisualizationList,
        };
    }

    searchPathToAllFoods(startCell){
        const foodManager = Game.instance.foodManager;
        const startState = new State(startCell.coordinate, [], foodManager.getAllFoodsCoordinates());
        let frontier = [[null, startState]];
        let visitedStateTree = new StateTree();

        while(frontier.length > 0){
            let [parent, currentState] = frontier.shift();

            if(visitedStateTree.has(currentState)) continue;
            visitedStateTree.add(parent, currentState, -1);

            if(!currentState.foodCoordinates.length){
                return {
                    path: StateTreePathFinder.getPathFromRoot(Game.instance.grid, visitedStateTree, currentState),
                };
            }
            
            const pacmanCell = Game.instance.grid.getCell(currentState.pacmanCoordinate);

            pacmanCell.getNeighborCellsWithType(CellTypes.Empty).forEach(cell => {
                const newFoodCoordinates = currentState.foodCoordinates.filter(coor => coor.x != cell.coordinate.x || coor.y != cell.coordinate.y);
                const newState = new State(cell.coordinate, [], newFoodCoordinates);
                if(!visitedStateTree.has(newState)) {
                    frontier.push([currentState, newState]);
                }
            });
        }
        return {
            path: []
        };
    }
}

class AStar extends PathSearchAlgorithm{
    searchPathToFood(startCell){
        let frontier = new PriorityQueue();
        frontier.enqueue([null, startCell, 0],0);
        let visitedPathTree = new PathTree();
        let visitedVisualizationList = [];

        while(frontier.size() > 0){
            let [parent, currentCell, cost] = frontier.dequeue();
            
            const visitedCost = visitedPathTree.getCost(currentCell);
            if(visitedCost && cost >= visitedCost){
                continue;
            }
            
            visitedPathTree.add(parent, currentCell, cost);
            visitedVisualizationList.push(currentCell);
            
            if(currentCell.hasFood){
                return {
                    path: PathTreePathFinder.getPathFromRoot(visitedPathTree, currentCell),
                    visitedList: visitedVisualizationList,
                };
            }
            
            currentCell.getNeighborCellsWithType(CellTypes.Empty).forEach(cell => {
                const heuristic = this.manhattanHeuristic(cell);
                const cellCost = cost+1;
                const priority = cellCost + heuristic;
                frontier.enqueue([currentCell, cell, cellCost], priority);
            });
        }

        return {
            path: [],
            visitedList: visitedVisualizationList,
        };
    }

    manhattanHeuristic(cell){
        const foodCells = Game.instance.foodManager.foodCells;
        if(!foodCells.length){
            return -1;
        }
        const foodCell = foodCells[0];
        const distanceX = foodCell.coordinate.x - cell.coordinate.x;
        const distanceY = foodCell.coordinate.y - cell.coordinate.y;
        return Math.abs(distanceX) + Math.abs(distanceY);
    }
}

class Minimax extends SearchAlgorithm{
    getMovementDirection(pacman){   
        return null;
    }

    getMax(state, score){
        return {
            direction: null,
            score: score
        }
    }

    getMin(state, score){
        return {
            direction: null,
            score: score
        }
    }
}