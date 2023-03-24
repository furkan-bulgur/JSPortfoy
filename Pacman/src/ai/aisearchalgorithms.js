class SearchAlgorithm{
}

class BFS extends SearchAlgorithm{
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
}

class AStar extends SearchAlgorithm{
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
        const foodCell = Game.instance.foodManager.foodCell;
        if(!foodCell){
            return -1;
        }
        const distanceX = foodCell.coordinate.x - cell.coordinate.x;
        const distanceY = foodCell.coordinate.y - cell.coordinate.y;
        return Math.abs(distanceX) + Math.abs(distanceY);
    }
}