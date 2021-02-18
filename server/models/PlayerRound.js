const Player = require("./Player");
const GameConstants = require("../logic/GameConstants");

class PlayerRound {
    constructor(roundId){
        this.id = roundId;
        this.question = "";
        this.duration = GameConstants.ROUND_DURATION;
        this.reader = new Player();
        this.playerId = "";
        this.answers = [];
        this.sentAnswers = [];
    }
}
module.exports = PlayerRound;