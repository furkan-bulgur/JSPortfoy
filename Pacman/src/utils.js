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

class PriorityQueue{
// Least priority is most significant

    constructor(){
        this.heap = []; 
    }

    swap(index1, index2){
        const node = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = node;
    }

    getParentIndex(index){
        return Math.floor((index-1)/2);
    }

    getLeftChildIndex(index){
        return 2 * index + 1;
    }

    getRightChildIndex(index){
        return 2 * index + 2;
    }

    heapifyUp(index){
        const parentIndex = this.getParentIndex(index);
        const parent = this.heap[parentIndex];
        const current = this.heap[index];
        if(!parent || parent[1] < current[1]){
            return;
        }
        this.swap(parentIndex, index);
        this.heapifyUp(parentIndex);
    }

    heapifyDown(index){
        const leftChildIndex = this.getLeftChildIndex(index);
        const rightChildIndex = this.getRightChildIndex(index)

        const leftChild = this.heap[leftChildIndex];
        const rightChild = this.heap[rightChildIndex];
        const current = this.heap[index];

        let minChildIndex;
        let minChild;

        if(rightChild && leftChild){
            minChildIndex = rightChild[1] < leftChild[1] ? rightChildIndex : leftChildIndex ;
        }
        else if(rightChild){
            minChildIndex = rightChildIndex;
        }
        else if(leftChild){
            minChildIndex = leftChildIndex;
        }
        else {
            return;
        }
        
        minChild = this.heap[minChildIndex];

        if(minChild[1] > current[1]){
            return;
        }

        this.swap(minChildIndex, index)
        this.heapifyDown(minChildIndex);              
    }
    
    enqueue(value, priority){
        const node = [value, priority];
        this.heap.push(node); 
        this.heapifyUp(this.heap.length-1);
    }    
    
    peek(){
        return this.heap[0];
    }
    
    isEmpty(){
        return this.heap.length > 0 ? false : true;
    }
    
    dequeue(){
        if(this.isEmpty()){
            console.log("empty");
            return;
        }
        const result = this.heap[0][0];
        if(this.heap.length > 1){
            const last = this.heap.pop();
            this.heap[0] = last; 
            this.heapifyDown(0);
        }
        else{
            this.heap.shift();
        }
        return result;
    }
}
