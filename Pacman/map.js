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
        this.pacmanStartCell = null;
        this.emptyCells = [];
        this.foodManager = new FoodManager(this);
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
                        cell = this.createEmptyCell(coordinate);
                        this.foodManager.addFood(cell);
                        break;
                    case " ":
                        cell = this.createEmptyCell(coordinate);
                        break;
                    case "p":
                        cell = this.createEmptyCell(coordinate);
                        this.pacmanStartCell = cell;
                        break;
                    default:
                        cell = this.createEmptyCell(coordinate);
                        break;
                }
                cellMatrix[i][j] = cell;
            }
        }
        return cellMatrix;
    }

    createEmptyCell(coordinate){
        let cell = new EmptyCell(coordinate);
        this.emptyCells.push(cell);
        return cell;
    }

    initializeNeighborCellTypes(){
        for(var i = 0; i < levelSize.height; i++) {
            for(var j = 0; j < levelSize.width; j++) {
                let neighborCells = {};
                let neighborCellTypes = {};

                neighborCells[Directions.Up] = i > 0 ? this.cellMatrix[i - 1][j] : null;
                neighborCells[Directions.Down] = i < levelSize.height - 1 ? this.cellMatrix[i + 1][j] : null;
                neighborCells[Directions.Right] = j < levelSize.width - 1 ? this.cellMatrix[i][j + 1] : null;
                neighborCells[Directions.Left] = j > 0 ? this.cellMatrix[i][j - 1] : null;

                neighborCellTypes[Directions.Up] = i > 0 ? this.cellMatrix[i - 1][j].type : CellTypes.None;
                neighborCellTypes[Directions.Down] = i < levelSize.height - 1 ? this.cellMatrix[i + 1][j].type : CellTypes.None;
                neighborCellTypes[Directions.Right] = j < levelSize.width - 1 ? this.cellMatrix[i][j + 1].type : CellTypes.None;
                neighborCellTypes[Directions.Left] = j > 0 ? this.cellMatrix[i][j - 1].type : CellTypes.None;

                this.cellMatrix[i][j].initializeNeighborCellTypes(neighborCells ,neighborCellTypes);
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

    drawCell(){}
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
        if(this.hasFood){
            this.food.drawFood();
        }
    }
}

class FoodManager{
    static foodCount = 0;

    constructor(grid){
        this.grid = grid;
    }

    createFood(center){
        return new Food(center);
    }
    
    addFood(cell){
        if(cell.type == CellTypes.Empty && !cell.hasFood){
            const food = this.createFood(cell.getCenterPosition());
            cell.addFood(food);
            FoodManager.foodCount++;
        }
    }

    removeFood(cell){
        if(cell.hasFood){
            cell.removeFood();
            FoodManager.foodCount--;
        }
    }

    addFoodRandomly(){
        const cells = this.grid.emptyCells;
        let cell = cells[Math.floor(Math.random()*cells.length)];
        this.addFood(cell);
    }

    update(){
        if(!FoodManager.foodCount){
            this.addFoodRandomly();
        }
    }
}

class Food{
    static rad = 5;

    constructor(center){
        this.center = center;
        this.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    }

    drawFood(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.center.x, this.center.y, Food.rad, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}