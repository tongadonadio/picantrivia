const { Console } = require('console');
const express = require('express');
const GameRepository = require('./logic/GameRepository');

const app = express();

const server = require('http')
    .createServer(app)
    .listen("3000", (error) => {
        console.log('====> SERVER ONLINE <====');
    });

const path = require('path').resolve(__dirname, '../public');
app.use( express.static( path ) );

const repository = new GameRepository();

const io = require('socket.io')(server);
io.on('connection', socket => {
    console.log("Player connected => " + socket.id);

    //PLAYER DISCONNECTED
    socket.on('disconnect', () => {
        repository.removePlayer(socket.id);
    });

    //CREATE GAME
    socket.on('create_game', () => {
        let gameId = repository.createGame(socket.id);
        socket.emit('create_game_result', gameId.toUpperCase());
    });

    //CREATE PLAYER
    socket.on('create_player', (name) => {
        repository.createPlayer(socket.id, name);
        socket.emit('create_player_result', socket.id);
    });

    //JOIN GAME
    socket.on('join_game', (gameId) => {
        let fixedGameId = gameId.toUpperCase();
        if(repository.existGame(fixedGameId)){
            repository.joinGame(socket.id, fixedGameId);
            let players = repository.getPlayers(fixedGameId);
            let gameOwner = repository.getGameOwner(fixedGameId);
            socket.broadcast.to(gameOwner).emit('update_players_list', players);
            socket.emit('join_game_status', "OK");
        }else{
            socket.emit('join_game_status', "CANT_JOIN");
        }
    });

    //START GAME
    socket.on('start_game', (gameId) => {
        let fixedGameId = gameId.toUpperCase();
        let round = repository.createRound(fixedGameId);
        SocketHelper.sendMessageToEveryPlayer('start_round', fixedGameId, round);
    });

    //PLAYER VOTE
    socket.on('player_vote', (voteData) => {
        var stringData = JSON.stringify(voteData);
        var objectValue = JSON.parse(stringData);
        let answer = objectValue['answer'];
        let gameId = objectValue['gameId'];
        repository.playerVote(socket.id, answer, gameId);
        let readerId = repository.getReaderId(gameId);
        let sentAnswers = repository.getSentAnswers(gameId).map(function(x) {
            return x.sentAnswer;
         });
        
        //TODO: La siguiente linea deberia llamarse cuando esten todas las respuestas listas
        SocketHelper.sendMessageToOnePlayer('round_sent_answers', readerId, sentAnswers);
        
    });

    //READER VOTE
    socket.on('reader_vote', (voteData) => {
        var stringData = JSON.stringify(voteData);
        var objectValue = JSON.parse(stringData);
        let answer = objectValue['answer'];
        let gameId = objectValue['gameId'];
        let result =  repository.readerVote(socket.id, answer, gameId);
        let fixedGameId = gameId.toUpperCase();
        SocketHelper.sendMessageToEveryPlayer('round_result', fixedGameId, result);
    });
})


class SocketHelper {
    static sendMessageToEveryPlayer(eventName, gameId, object) {
        let players = repository.getPlayers(gameId);
        players.forEach(
                player => {
                    io.sockets.connected[player.id].emit(eventName, object)
                }
        )
    }

    static sendMessageToOnePlayer(eventName, socketId, object) {
        io.sockets.connected[socketId].emit(eventName, object)
    }
}