const Player = require("./Player");

class RoundResult{
    constructor(){
        this.question = "";
        this.winner;
        this.winnerAnswer = "";
    }
}
module.exports = RoundResult;