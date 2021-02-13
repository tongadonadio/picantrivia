const Game = require('../models/Game');
const Round = require('../models/Round');

class GameRepository{

    constructor(){
        this.games = [];
    }

    createGame(socketId){
        let newGame = new Game(socketId);
        this.games.push(newGame);
        return newGame.id;
    }

    joinGame(socketId, gameId){
        this.games = this.games.map(game => {
            if(game.id === gameId){
                game.addPlayer(socketId);
            }
            return game;
        });
    }

    getPlayers(gameId){
        let game = this.games.find(x => x.id == gameId);
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