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
            visitedPathTree.add(parent, currentCell);
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

class DFS extends SearchAlgorithm{
    searchPathToFood(startCell){
        let frontier = [[null, startCell]];
        let visitedPathTree = new PathTree();
        let visitedVisualizationList = [];

        while(frontier.length > 0){
            let [parent, currentCell] = frontier.pop();

            if(visitedPathTree.has(currentCell)) continue;
            visitedPathTree.add(parent, currentCell);
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