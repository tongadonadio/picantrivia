const Player = require("./Player");

class PlayerRound {
    constructor(roundId){
        this.id = roundId;
        this.question = "";
        this.duration = 10000;
        this.reader = new Player();
        this.playerId = "";
        this.answers = [];
        this.sentAnswers = [];
    }
}
module.exports = PlayerRound;