class Pacman extends Character{
    static radius = 10;
    static color = "yellow";

    constructor(startCell, startDirection){
        super(startCell, startDirection);
        this.pacmanAnimation = new PacmanAnimation(this);
        Game.instance.addDrawListener(this);
        Game.instance.addUpdateListener(this);
    }

    update(){
        if(this.currentCell.hasFood){
            this.eat();
        }
    }

    eat(){
        Game.instance.foodManager.removeFood(this.currentCell);
        Game.instance.scoreManager.changeScore(ScoreChangeReason.Eat);
    }

    die(){
        Game.instance.gameOver();
    }

    draw(){
        this.pacmanAnimation.animate();
    }
}

class PacmanAnimation{
    static switchTime = 100;

    constructor(pacman){
        this.pacman = pacman;
        this.counter = 0;
        this.frequency = PacmanAnimation.switchTime / gameLoopInterval;
    }

    animate(){
        if(Math.floor(this.counter / this.frequency) % 2 == 0){
            this.drawMouthLargeOpen();
        }else{
            this.drawMouthSmallOpen();
        }
        this.counter += 1;
    }

    drawMouthSmallOpen(){
        const rotation = AnimationUtils.getRotationRadian(this.pacman.direction);

        ctx.beginPath();
        ctx.fillStyle = Pacman.color;
        ctx.arc(this.pacman.position.x, this.pacman.position.y, Pacman.radius, (1/8) * Math.PI + rotation, (9/8) * Math.PI + rotation);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = Pacman.color;
        ctx.arc(this.pacman.position.x, this.pacman.position.y, Pacman.radius, (7/8) * Math.PI + rotation, (-1/8) * Math.PI + rotation);
        ctx.fill();
        ctx.closePath();
    }

    drawMouthLargeOpen(){
        const rotation = AnimationUtils.getRotationRadian(this.pacman.direction);

        ctx.beginPath();
        ctx.fillStyle = Pacman.color;
        ctx.arc(this.pacman.position.x, this.pacman.position.y, Pacman.radius, (1/4) * Math.PI + rotation, (5/4) * Math.PI + rotation);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = Pacman.color;
        ctx.arc(this.pacman.position.x, this.pacman.position.y, Pacman.radius, (3/4) * Math.PI + rotation, (-1/4) * Math.PI + rotation);
        ctx.fill();
        ctx.closePath();
    }
}