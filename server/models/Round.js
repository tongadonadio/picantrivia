const Player = require("./Player");
const GameConstants = require("../logic/GameConstants");

class Round{
    constructor(roundId){
        this.id = roundId;
        this.question = "";
        this.duration = GameConstants.ROUND_DURATION;
        this.reader = new Player();
        this.answers = [];
        this.sentAnswers = [];
    }

    addSentAnswer(answer){
        this.sentAnswers.push(answer);
    }
}
module.exports = Round;