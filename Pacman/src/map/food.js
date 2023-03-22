class FoodManager{
    static foodCount = 0;

    constructor(grid){
        this.grid = grid;
        this.foodCell = null;
    }

    createFood(center){
        return new Food(center);
    }
    
    addFood(cell){
        if(cell.type == CellTypes.Empty && !cell.hasFood){
            const food = this.createFood(cell.getCenterPosition());
            cell.addFood(food);
            this.foodCell = cell;
            FoodManager.foodCount++;
        }
    }

    removeFood(cell){
        if(cell.hasFood){
            cell.removeFood();
            this.foodCell = null;
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