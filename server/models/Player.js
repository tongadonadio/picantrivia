class Player{
    constructor(socketId, name){
        this.id = socketId;
        this.name = name;
        this.score = 0;
    }
}
module.exports = Player;