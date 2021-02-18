const Player = require('./Player');
const Round = require('./Round');
const RoundResult = require('./RoundResult');
const PlayerRound = require('./PlayerRound');
const QuestionsAndAnswersRepository = require('../logic/QuestionsAndAnswersRepository');
const GameConstants = require('../logic/GameConstants');

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
        newRound.reader = this.players[Math.floor(Math.random() * this.players.length)];
        this.round = newRound;
        return newRound;
    }

    getCustomRoundForEachPlayer(){
        let result = [];
        let answersQuantity = GameConstants.ANSWERS_QUANTITY;
        for (var i = 0; i < this.players.length; i++) {
            let newRound = new PlayerRound(this.currentRoundId);
            newRound.question = this.round.question;
            newRound.duration = this.round.duration;
            newRound.answers = this.round.answers.slice(i * answersQuantity, (i + 1) * answersQuantity);
            newRound.playerId = this.players[i].id;
            newRound.reader = this.round.reader;
            result.push(newRound);    
        }
        return result;
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
        var characters       = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

}
module.exports = Game;