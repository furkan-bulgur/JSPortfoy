const scoreText = document.getElementById("score");

class ScoreManager{
    constructor(scoreProperties){
        this.scoreProperties = scoreProperties;
        this.score = this.scoreProperties.initialScore;
        this.text = scoreText;
        this.text.innerText = `SCORE: ${this.score}`;
    }
    
    changeScore(reason){
        let change = 0;
        switch (reason) {
            case ScoreChangeReason.Move:
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
}