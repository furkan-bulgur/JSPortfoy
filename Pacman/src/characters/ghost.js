class Ghost extends Character{
    static color = "orange";
    static outerEyeColor = "white";
    static headRadius = 10;
    static eyeRadius = 3;

    constructor(startCell, startDirection){
        super(startCell, startDirection);
        this.ghostAnimation = new GhostAnimation(this);
        Game.instance.addDrawListener(this);
    }

    update(){
        //TODO: Kill pacman
    }

    draw(){
        this.ghostAnimation.animate();
    }
}

class GhostAnimation{
    static switchTime = 100;

    constructor(ghost){
        this.ghost = ghost;
        this.counter = 0;
        this.frequency = PacmanAnimation.switchTime / gameLoopInterval;
    }

    animate(){
        this.drawSimpleGhost();
        this.counter += 1;
    }

    drawSimpleGhost(){
        //head
        ctx.beginPath();
        ctx.fillStyle = Ghost.color;
        ctx.arc(this.ghost.position.x, this.ghost.position.y, Ghost.headRadius, Math.PI, 0);
        ctx.fill();
        ctx.closePath();

        //body
        ctx.beginPath();
        ctx.fillStyle = Ghost.color;
        ctx.rect(this.ghost.position.x - Ghost.headRadius, this.ghost.position.y, 2 * Ghost.headRadius, Ghost.headRadius);
        ctx.fill();
        ctx.closePath();

        //eyes
        ctx.beginPath();
        ctx.fillStyle = Ghost.outerEyeColor;
        ctx.arc(this.ghost.position.x - (1.5) * Ghost.eyeRadius, this.ghost.position.y, Ghost.eyeRadius, 2*Math.PI, 0);
        ctx.arc(this.ghost.position.x + (1.5) * Ghost.eyeRadius, this.ghost.position.y, Ghost.eyeRadius, 2*Math.PI, 0);
        ctx.fill();
        ctx.closePath();
    }
}