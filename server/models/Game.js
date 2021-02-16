const Player = require('./Player');
const Round = require('./Round');
const RoundResult = require('./RoundResult');
const MAX_SCORE = 2;

class Game{
    constructor(){
        this.id = this.generateid();
        this.owner = new Player();
        this.players = [];
        this.currentRoundId = 0;
        this.round = new Round(this.currentRoundId);
        this.roundResult = new RoundResult();
    }

    addPlayer(newPlayer){
        this.players.push(newPlayer);
    }

    createRound(question, answers){
        this.currentRoundId = this.currentRoundId + 1;
        let newRound = new Round(this.currentRoundId);
        newRound.question = question;
        newRound.answers = answers;
        newRound.reader = this.players[0];
        this.round = newRound;
        return newRound;
    }

    getPlayers(){
        return this.players;
    }

    isGameOver(){
        return this.players.find(x => x.score === MAX_SCORE) != null;
    }

    generateid() {
        var length = 2;
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

}
module.exports = Game;