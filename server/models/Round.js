const Player = require("./Player");

class Round{
    constructor(roundId){
        this.id = roundId;
        this.question = "";
        this.duration = 10000;
        this.reader = new Player();
        this.answers = [];
        this.sentAnswers = [];
    }

    addSentAnswer(answer){
        this.sentAnswers.push(answer);
    }
}
module.exports = Round;