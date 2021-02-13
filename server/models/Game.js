const Player = require('./Player');

class Game{
    constructor(socketId){
        this.id = this.generateid();
        this.owner = new Player(socketId);
        this.players = [];
        this.round;
    }

    addPlayer(socketId){
        let newPlayer = new Player(socketId);
        this.players.push(newPlayer);
    }

    getPlayers(){
        return this.players;
    }

    generateid() {
        var length = 6;
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