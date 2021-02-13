const Player = require('./Player');

class Game{
    constructor(){
        this.id = this.generateid();
        this.owner = new Player();
        this.players = [];
        this.round;
    }

    addPlayer(newPlayer){
        this.players.push(newPlayer);
    }

    getPlayers(){
        return this.players;
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