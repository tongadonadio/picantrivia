const Player = require("./Player");

class RoundResult{
    constructor(questionRes, winnerRes, winnerAnswerRes, playersRes){
        this.question = questionRes;
        this.winner = winnerRes;
        this.winnerAnswer = winnerAnswerRes;
        this.players = playersRes;
    }
}
module.exports = RoundResult;