class FoodManager{
    static foodCount = 0;
    
    constructor(grid, foodAmount, shouldAutoFill){
        this.grid = grid;
        this.foodAmount = foodAmount;
        this.foodCells = [];
        this.shouldAutoFill = shouldAutoFill;
        Game.instance.addUpdateListener(this);
        this.addFoodRandomly();
    }

    reset(){
        FoodManager.foodCount = 0;
    }

    createFood(center){
        return new Food(center);
    }
    
    addFood(cell){
        if(cell.type == CellTypes.Empty && !cell.hasFood){
            const food = this.createFood(cell.getCenterPosition());
            cell.addFood(food);
            this.foodCells.push(cell);
            FoodManager.foodCount++;
        }
    }

    removeFood(cell){
        if(cell.hasFood){
            cell.removeFood();
            this.foodCells = this.foodCells.filter(c => c != cell)
            FoodManager.foodCount--;
        }
    }
    
    getAvailableRandomCellForFood(){
        const cells = this.grid.emptyCells;
        let cell = cells[Math.floor(Math.random()*cells.length)];
        while(cell.hasCharacterOnCell(Pacman.name) || cell.hasFood){
            cell = cells[Math.floor(Math.random()*cells.length)];
        }
        return cell;
    }

    addFoodRandomly(){
        let amount = Math.min(this.grid.emptyCells.length-1, this.foodAmount); //because there is pacman emptyCells.length-1 is used
        let cell;
        while(amount--){
            cell = this.getAvailableRandomCellForFood();
            this.addFood(cell);
        }
    }

    update(){
        if(!FoodManager.foodCount && this.shouldAutoFill){
            this.addFoodRandomly();
        }
        else if(!FoodManager.foodCount){
            Game.instance.winGame();
        }
    }

    getAllFoodsCoordinates(){
        return this.foodCells.map(cell => cell.coordinate);
    }
}

class Food{
    static rad = 5;

    constructor(center){
        this.center = center;
        this.color = this.getRandomColor();
    }

    getRandomColor(){
        var letters = '6789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }

    drawFood(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.center.x, this.center.y, Food.rad, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}