const scoreText = document.getElementById("score");

class ScoreManager{
    constructor(scoreProperties){
        this.scoreProperties = scoreProperties;
        this.score = this.scoreProperties.score;
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
        
        if(this.score <= 0){
            Game.instance.onScoreBecomeZeroOrLower();
        }
    }

    showGameOverText(){
        this.text.innerText = "GAME OVER";
        this.text.style.color = "red";
    }

    showGameWonText(){
        this.text.innerText = `Game Won With Score ${this.score}`;
        this.text.style.color = "white";
    }
}