const scoreText = document.getElementById("score");

class ScoreManager{
    constructor(scoreProperties){
        this.scoreProperties = scoreProperties;
        this.score = this.scoreProperties.initialScore;
        this.text = scoreText;
        this.text.style.color = "white";
        this.text.innerText = `SCORE: ${this.score}`;
    }
    
    changeScore(reason){
        let change = 0;
        switch (reason) {
            case ScoreChangeReason.Tick:
                change = this.scoreProperties.moveScore;
                break;
            case ScoreChangeReason.Eat:
                change = this.scoreProperties.eatScore;
                break;
            default:
                break;
        }
        this.score += change;
        this.text.innerText = `SCORE: ${this.score}`;
    }

    showGameOverText(){
        this.text.innerText = "GAME OVER";
        this.text.style.color = "red";
    }
}