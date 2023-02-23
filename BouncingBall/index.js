const canvasDimensions = {
    width: 300,
    height: 300,
}

const canvas = document.getElementById("ball-canvas");
canvas.width = canvasDimensions.width;
canvas.height = canvasDimensions.height;
const ctx = canvas.getContext("2d");

const ball = {
    x: 50,
    y: 50,
    r: 10,
    move: function(ballMovement){
        ballMovement.updateAngle(this);
        this.x += ballMovement.getDeltaX();
        this.y += ballMovement.getDeltaY();
    }
}

const ballMovement = {
    speed: 1,
    angle: 30,
    getDeltaX: function(){
        return Math.cos(Math.PI * this.angle / 180) * this.speed;
    },
    getDeltaY: function(){
        return Math.sin(Math.PI * this.angle / 180) * this.speed;
    },
    updateAngle: function(ball){
        if (ball.x + ball.r >= canvasDimensions.width || ball.x - ball.r <= 0){
            this.angle = 180 - this.angle;
        }
        if (ball.y + ball.r >= canvasDimensions.height || ball.y - ball.r <= 0){
            this.angle = -this.angle;
        }
    }
}

const drawBall = () => {
    ball.move(ballMovement)

    ctx.clearRect(0,0,canvasDimensions.width, canvasDimensions.height)
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

setInterval(drawBall, 5)