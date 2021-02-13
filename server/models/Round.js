class Round{
    constructor(id = currentId){
        this.id = currentId;
        this.question = "";
        this.duration = 20;
        this.reader = 0;
        this.winner = 0;
        this.winnerAnswer = 0;
        this.answers = [];
    }
}
module.exports = Round;