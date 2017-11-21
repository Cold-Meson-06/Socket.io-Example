import "./player"
import "./gameData.js"

const io = require('socket.io')(http)

//When a new connection happens
io.on('connection', newUserSocket => {

    //If he try to join.    
    newUserSocket.on('CL:try_to_join', (name, registerPlayersBack) => {

        //We have a new player, start the engine.
        GameData.startEngineIfNotRunning()

        //Add a name for that socket
        newUserSocket.name = name

        //Register the player
        GameData.registerPlayer(name)

        //Send all players to the new client
        registerPlayersBack(GameData.getAllPlayersSerialized())
        
        //Say to everyone that we have a new player
        io.emit('SRV:player_jonied', GameData.getPlayer(name).serialize())

        //Register the socket function handlers:

        //If he walks or look arround.
        newUserSocket.on('CLT:updatePlayerPos', (data) => {
            GameData.updatePlayer(data.sender, data)
            GameData.requestSync()
        })

        //If he shoots a bullet.
        newUserSocket.on('CLT:player_shoot', (data) => {
            io.emit('SRV:receive_shoot', data)
        })

        //If he disconects. 
        newUserSocket.on('disconnect', () => {
            GameData.deletePlayer(newUserSocket.name)
            io.emit("SRV:player_disconnect", { playerName: newUserSocket.name })
            //We dont have any players, stop the engine.
            if (GameData.getPlayerCount() === 0) {
                GameData.stopEngineIfRunning()
            }
        })
    })
})

