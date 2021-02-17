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
        console.log("Player disconnected => " + socket.id);
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
        repository.createRound(fixedGameId);
        let roundsList = repository.getCurrentRoundForPlayers(fixedGameId);
        roundsList.forEach(
            round => {
                SocketHelper.sendMessageToOnePlayer('start_round', round.playerId, round);
            }
        )
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
        const START_ROUND_DELAY = 5000;
        var stringData = JSON.stringify(voteData);
        var objectValue = JSON.parse(stringData);
        let answer = objectValue['answer'];
        let gameId = objectValue['gameId'];
        let fixedGameId = gameId.toUpperCase();
        let roundResult =  repository.readerVote(answer, fixedGameId);

        if (repository.isGameOver(fixedGameId)) {
            SocketHelper.sendMessageToEveryPlayer('game_over', fixedGameId, roundResult);
            repository.removeGame(fixedGameId);
        } else {
            SocketHelper.sendMessageToEveryPlayer('round_result', fixedGameId, roundResult);
            setTimeout(() => {
                let fixedGameId = gameId.toUpperCase();
                repository.createRound(fixedGameId);
                let roundsList = repository.getCurrentRoundForPlayers(fixedGameId);
                roundsList.forEach(
                    round => {
                        SocketHelper.sendMessageToOnePlayer('start_round', round.playerId, round);
                    }
                )
            }, START_ROUND_DELAY);
        }
    });
});

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