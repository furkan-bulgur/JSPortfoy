const CellTypes = {
    None: 0,
    Empty: 1,
    Wall: 2
}

const levelSize = levelModel.levelSize;

class ScoreManager{
    constructor(score, text){
        this.score = score;
        this.text = text;
        this.text.innerText = `SCORE: ${this.score}`;
    }

    changeScore(change){
        this.score += change;
        this.text.innerText = `SCORE: ${this.score}`;
    }
}

class Grid{
    constructor(gridMatrix){
        this.cellMatrix = this.createCellMatrix(gridMatrix);
        this.initializeNeighborCellTypes();
    }

    createEmptyCellMatrix(){
        let cellMatrix = []
        for(var i = 0; i < levelSize.height; i++) {
            cellMatrix[i] = [];
            for(var j = 0; j < levelSize.width; j++) {
                cellMatrix[i][j] = undefined;
            }
        }
        return cellMatrix;
    }

    createCellMatrix(gridMatrix){
        let cellMatrix = this.createEmptyCellMatrix();

        for (let i = 0; i < levelSize.height; i++) {
            const row = gridMatrix[i];
            for (let j = 0; j < levelSize.width; j++) {
                const cellStr = row[j];
                let cell;
                const coordinate = {
                    x: j,
                    y: i
                }

                switch (cellStr) {
                    case "#":
                        cell = new WallCell(coordinate);
                        break;
                    case "o":
                        cell = new EmptyCell(coordinate, true);
                        break;
                    case " ":
                        cell = new EmptyCell(coordinate, false);
                        break;
                    default:
                        cell = new EmptyCell(coordinate);
                        break;
                }
                cellMatrix[i][j] = cell;
            }
        }
        return cellMatrix;
    }

    initializeNeighborCellTypes(){
        for(var i = 0; i < levelSize.height; i++) {
            for(var j = 0; j < levelSize.width; j++) {
                let neighborCellTypes = {}

                neighborCellTypes[Directions.Up] = i > 0 ? this.cellMatrix[i - 1][j].type : CellTypes.None;
                neighborCellTypes[Directions.Down] = i < levelSize.height - 1 ? this.cellMatrix[i + 1][j].type : CellTypes.None;
                neighborCellTypes[Directions.Right] = j < levelSize.width - 1 ? this.cellMatrix[i][j + 1].type : CellTypes.None;
                neighborCellTypes[Directions.Left] = j > 0 ? this.cellMatrix[i][j - 1].type : CellTypes.None;

                this.cellMatrix[i][j].initializeNeighborCellTypes(neighborCellTypes);
            }
        }
    }

    getCell(coordinate){
        return this.cellMatrix[coordinate.y][coordinate.x];
    }

    getCellFromPosition(position){
        const xCoor = Math.floor(position.x / Cell.size.width);
        const yCoor = Math.floor(position.y / Cell.size.height);
        return this.getCell({x: xCoor, y: yCoor});
    }

    draw(){
        this.cellMatrix.forEach(row => {
            row.forEach(cell => {
                cell.drawCell();
            })
        })
    }
}

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
    }

    initializeNeighborCellTypes(neighborCellTypes){
        this.neighborCellTypes = neighborCellTypes;
    }

    getCenterPosition(){
        return{
            x: this.position.x + Cell.size.width / 2,
            y: this.position.y + Cell.size.height / 2,
        }
    }

    drawCell(){}
}

class WallCell extends Cell{
    constructor(coordinate){
        super(coordinate, CellTypes.Wall);
        this.wall = new Wall(this.position, Cell.size);
    }

    initializeNeighborCellTypes(neighborCellTypes){
        super.initializeNeighborCellTypes(neighborCellTypes);

        let extensions = {}

        extensions[Directions.Up] = this.neighborCellTypes[Directions.Up] == CellTypes.Wall ? true : false;
        extensions[Directions.Left] = this.neighborCellTypes[Directions.Left] == CellTypes.Wall ? true : false,
        extensions[Directions.Down] = this.neighborCellTypes[Directions.Down] == CellTypes.Wall ? true : false,
        extensions[Directions.Right] = this.neighborCellTypes[Directions.Right] == CellTypes.Wall ? true : false,

        this.wall.initializeInWallExtensions(extensions)
    }

    drawCell(){
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
    constructor(coordinate, hasFood){
        super(coordinate, CellTypes.Empty);
        this.hasFood = hasFood;
        this.food = null;

        if(this.hasFood){
            this.food = new Food(this);
        }
    }

    removeFood(){
        this.hasFood = false;
        this.food = null;
    }

    drawCell(){
        if(this.hasFood){
            this.food.drawFood();
        }
    }
}

class Food{
    static color = "white";
    static rad = 5;

    constructor(parentCell){
        this.parentCell = parentCell;
        this.center = parentCell.getCenterPosition();
    }

    drawFood(){
        ctx.beginPath();
        ctx.fillStyle = Food.color;
        ctx.arc(this.center.x, this.center.y, Food.rad, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}