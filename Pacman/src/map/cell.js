class Cell{
    static size = {
        width: 20,
        height: 20
    }

    constructor(coordinate, type){
        this.coordinate = coordinate;
        this.position = {
            x: Cell.size.width * coordinate.x,
            y: Cell.size.height * coordinate.y,
        };
        this.type = type;
        this.color = null;
        this.charactersOnCell = [];
    }

    addCharacterOnCell(character){
        this.charactersOnCell.push(character);
    }

    removeCharacterOnCell(character){
        this.charactersOnCell = this.charactersOnCell.filter(c => c != character);
    }

    hasCharacterOnCell(classType){
        let has = false;
        this.charactersOnCell.forEach(character => {
            if(character.constructor.name == classType){
                has = true;
            }
        });
        return has;
    }

    initializeNeighborCellTypes(neighborCells, neighborCellTypes){
        this.neighborCells = neighborCells;
        this.neighborCellTypes = neighborCellTypes;
    }

    getCenterPosition(){
        return{
            x: this.position.x + Cell.size.width / 2,
            y: this.position.y + Cell.size.height / 2,
        }
    }

    getNeighborCellsWithType(type){
        return Object.values(this.neighborCells).filter(
            cell => cell.type == type
        );
    }

    setColor(color){
        this.color = color;
    }

    resetColor(){
        this.color = null;
    }

    drawCell(){
        if(this.color){
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.rect(this.position.x, this.position.y, Cell.size.width , Cell.size.height);
            ctx.fill();
            ctx.closePath();
        }
    }
}

class WallCell extends Cell{
    constructor(coordinate){
        super(coordinate, CellTypes.Wall);
        this.wall = new Wall(this.position, Cell.size);
    }

    initializeNeighborCellTypes(neighborCells, neighborCellTypes){
        super.initializeNeighborCellTypes(neighborCells, neighborCellTypes);

        let extensions = {}

        extensions[Directions.Up] = this.neighborCellTypes[Directions.Up] == CellTypes.Wall ? true : false;
        extensions[Directions.Left] = this.neighborCellTypes[Directions.Left] == CellTypes.Wall ? true : false,
        extensions[Directions.Down] = this.neighborCellTypes[Directions.Down] == CellTypes.Wall ? true : false,
        extensions[Directions.Right] = this.neighborCellTypes[Directions.Right] == CellTypes.Wall ? true : false,

        this.wall.initializeInWallExtensions(extensions)
    }

    drawCell(){
        super.drawCell();
        this.wall.drawWall();
    }
}

class Wall{
    static color = "blue";
    static inColor = "black";
    static thickness = 3;

    constructor(position, size){
        this.position = position;
        this.size = size;
        this.inWallPosition = {
            x: this.position.x + Wall.thickness,
            y: this.position.y + Wall.thickness
        }
        this.inWallSize = {
            width: this.size.width - 2 * Wall.thickness,
            height: this.size.height - 2 * Wall.thickness,
        }
    }

    initializeInWallExtensions(extensions){
        this.extensions = extensions;
    }

    drawWall(){
        ctx.beginPath();
        ctx.fillStyle = Wall.color;
        ctx.rect(this.position.x, this.position.y, this.size.width, this.size.height);
        ctx.fill();
        ctx.closePath();

        this.drawInWall();
    }

    drawInWall(){
        ctx.beginPath();
        ctx.fillStyle = Wall.inColor;
        ctx.rect(this.inWallPosition.x, this.inWallPosition.y, this.inWallSize.width , this.inWallSize.height);
        
        if(this.extensions[Directions.Up]){
            ctx.rect(this.inWallPosition.x, this.inWallPosition.y - Wall.thickness, this.inWallSize.width , Wall.thickness);
        }
        if(this.extensions[Directions.Down]){
            ctx.rect(this.inWallPosition.x, this.inWallPosition.y + this.inWallSize.height, this.inWallSize.width , Wall.thickness);
        }
        if(this.extensions[Directions.Left]){
            ctx.rect(this.inWallPosition.x - Wall.thickness, this.inWallPosition.y, Wall.thickness, this.inWallSize.height);
        }
        if(this.extensions[Directions.Right]){
            ctx.rect(this.inWallPosition.x + this.inWallSize.width, this.inWallPosition.y, Wall.thickness, this.inWallSize.height);
        }

        ctx.fill();
        ctx.closePath();
    }
}

class EmptyCell extends Cell{
    constructor(coordinate){
        super(coordinate, CellTypes.Empty);
        this.hasFood = false;
        this.food = null;
    }

    addFood(food){
        this.hasFood = true;
        this.food = food;
    }

    removeFood(){
        this.hasFood = false;
        this.food = null;
    }

    drawCell(){
        super.drawCell();
        if(this.hasFood){
            this.food.drawFood();
        }
    }
}

