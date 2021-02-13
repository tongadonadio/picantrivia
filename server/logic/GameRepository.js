const Game = require('../models/Game');
const Player = require('../models/Player');
const Round = require('../models/Round');

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
        let newRound = new Round();
        game.push(newGame);
        this.games = this.games.map(game => {
            if(game.id === gameId){
                game.currentRound = newRound;
            }
            return game;
        });
    }

}
module.exports = GameRepository;