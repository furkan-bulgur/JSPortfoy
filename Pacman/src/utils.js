class PathTree{
    constructor(){
        this.visited = new Map();
        this.rootNode = null;
    }

    has(cell){
        return this.visited.has(cell);
    }

    getNode(cell){
        if(this.has(cell)){
            return this.visited.get(cell);
        }else{
            return null;
        }
    }

    add(parent, cell){
        if(this.has(cell)) return;

        const parentNode = this.getNode(parent);
        let newNode = null;

        if(parentNode == null && this.rootNode == null){
            newNode = new PathTreeNode(parentNode, cell);
            this.rootNode = newNode;
            this.visited.set(cell, newNode);
        }
        else if(parentNode != null){
            newNode = new PathTreeNode(parentNode, cell);
            this.visited.set(cell, newNode);
        }
    }
}

class PathTreeNode{
    constructor(parentNode, cell){
        this.parentNode = parentNode;
        this.cell = cell;
    }
}
 
class PathTreePathFinder{
    static getPathFromRoot(pathTree, cell){
        const path = [];
        path.push(cell);
        let node = pathTree.getNode(cell);
        while(node != null && node.parentNode != null){
            node = node.parentNode;
            if(node == null && node.cell == null) break;
            path.push(node.cell);
        }
        return path;
    }
}