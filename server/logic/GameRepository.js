const Game = require('../models/Game');
const Player = require('../models/Player');
const RoundResult = require('../models/RoundResult');
const SentAnswer = require('../models/SentAnswer');
const QuestionsAndAnswersRepository = require('./QuestionsAndAnswersRepository');

class GameRepository{

    constructor(){
        this.games = [];
        this.players = [];
    }

    createPlayer(socketId, userName){
        let player = new Player(socketId, userName);
        this.players.push(player);
    }
    
    createGame(socketId){
        let newGame = new Game();
        let owner = this.players.find(x => x.id === socketId);
        newGame.owner = owner;
        newGame.addPlayer(owner);
        this.games.push(newGame);
        return newGame.id;
    }

    joinGame(socketId, gameId){
        let game = this.games.find(x => x.id === gameId);
        let player = this.players.find(x => x.id === socketId);
        game.addPlayer(player);
    }

    getGameOwner(gameId){
        let game = this.games.find(x => x.id === gameId);
        return game.owner.id;
    }

    existGame(gameId){
        let result = false;
        this.games.map(game => {
            if(game.id === gameId){
                result = true;
                return false;
            }
        });
        return result;
    }

    getPlayers(gameId){
        let game = this.games.find(x => x.id === gameId);
        if(game != null){
            return game.getPlayers();
        }
    }

    createRound(gameId){
        let game = this.games.find(x => x.id === gameId);
        let question = QuestionsAndAnswersRepository.getQuestion();
        let answers = QuestionsAndAnswersRepository.getAnswers(game.players.length);
        game.createRound(question, answers);
    }

    getCurrentRoundForPlayers(gameId){
        let game = this.games.find(x => x.id === gameId);
        return game.getCustomRoundForEachPlayer();
    }

    removePlayer(socketId){
        this.players = this.players.filter(x => x.id !== socketId);
    }

    removeGame(gameId){
        this.games = this.games.filter(x => x.id !== gameId);
    }

    playerVote(socketId, answer, gameId){
        let game = this.games.find(x => x.id === gameId);
        let sentAnswer = new SentAnswer(socketId, answer);
        game.round.addSentAnswer(sentAnswer)
    }


    getRoundResult(answer, gameId){
        let game = this.games.find(x => x.id === gameId);
        if(answer != null){
            let roundWinnerId = game.round.sentAnswers.find(x => x.sentAnswer === answer).playerId;
            let roundWinner = game.getPlayers().find(x => x.id === roundWinnerId);
            roundWinner.score = roundWinner.score + 1;
            return new RoundResult(game.round.question, roundWinner, answer, game.getPlayers());
        } else {
            return new RoundResult(game.round.question, null, "", game.getPlayers());
        }
    }

    getReaderId(gameId){
        let game = this.games.find(x => x.id === gameId);
        return game.round.reader.id;
    }

    getSentAnswers(gameId){
        let game = this.games.find(x => x.id === gameId);
        return game.round.sentAnswers;
    }

    isGameOver(gameId){
        let game = this.games.find(x => x.id === gameId);
        return game.isGameOver(game.id);
    }
}

module.exports = GameRepository;