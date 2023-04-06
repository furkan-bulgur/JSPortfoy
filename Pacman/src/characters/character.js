class Character{
    constructor(startCell, startDirection){
        this.currentCell = startCell;
        this.direction = startDirection;
        this.position = this.currentCell.getCenterPosition();
    }

    move(direction){
        this.direction = direction;
        const nextCell = this.currentCell.neighborCells[direction];
        if(!nextCell || nextCell.type == CellTypes.Wall) return;

        const nextPosition = nextCell.getCenterPosition();
        this.position = nextPosition;
        this.currentCell.removeCharacterOnCell(this);
        this.currentCell = nextCell;
        this.currentCell.addCharacterOnCell(this);
    }

    canMove(direction){
        this.direction = direction;
        const nextCell = this.currentCell.neighborCells[direction];
        return nextCell && nextCell.type != CellTypes.Wall;
    }
}