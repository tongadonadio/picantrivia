class Player{
    constructor(socketId){
        this.id = socketId;
        this.name = "Sin nombre";
        this.score = 0;
    }
}
module.exports = Player;