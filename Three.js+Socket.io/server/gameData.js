import "./utils"

//Functions to manage players
const GameData = (() => {

    //Controll variables:

    let updateLoopRunning = false   //To tell if the engine is running
    let packetSendTimeout = 50      //The interval in milliseconds of the update
    let players = {}                //A list with all the players in a section
    let inSync = true               //If all users are not moving
    let canSend = true              //If the engine is allowed to send packets

    //Returns a list with a serialized representation of 
    //all players if them changed
    function serializedPlayersThatChanged() {
        let result = []
        for (let playerName in players) {
            let player = players[playerName]
            if (player.changed) {
                result.push(player.serialize())
            }
        }
        return result
    }

    //Anouces that the engine completed an sync
    //warning: can override values if a player update during a sync
    function reSync() {
        for (let playerName in players) {
            let player = players[playerName]
            player.changed = false
        }
        inSync = true
    }

    //Sets `inSync` to false, so, in the next update
    //all the unsynced data will be sent
    function requestSync() {
        inSync = false
    }

    //Adds a player to the registry
    function registerPlayer(name, socket) {
        players[name] = new Player(name, socket)
        return players[name]
    }

    //Removes a player from the registry
    function deletePlayer(name) {
        delete players[name]
    }

    //Updates all the data about an given player
    function updatePlayer(name, data) {
        players[name].update(data)
    }

    //Returns a list with all names of players logged
    function getPlayerNames() {
        return Object.keys(players)
    }

    //Returns a list with all players serialized
    function getAllPlayersSerialized() {
        let result = []
        for(let key in players){
            result.push(players[key].serialize())
        }
        return result
    }

    //Returns a list with all players
    function getPlayerCount() {
        return getPlayerNames().length
    }

    //`startEngineIfNotRunning` starts the engine if not running
    function startEngineIfNotRunning() {
        if (!updateLoopRunning) {
            updateLoopRunning = true
            console.log("Starting engine.")
            ticker()
        }
    }

    //`stopEngineIfRunning` stops the engine if running
    function stopEngineIfRunning() {
        if (updateLoopRunning) {
            console.log("Stopping engine.")
            updateLoopRunning = false
        }
    }

    //The ticker function tests for chages and send 
    //all not synced data 
    function ticker() {
        if (!updateLoopRunning) {
            return
        }
        if (canSend && !inSync) {
            io.emit('SRV:sync_players', serializedPlayersThatChanged())
            reSync()
        }
        utils.callAfter(ticker, packetSendTimeout)
    }

    //Returns a player
    function getPlayer(name) {
        return players[name]
    }

    return {
        updateLoopRunning,
        packetSendTimeout,
        players,
        inSync,
        canSend,
        requestSync,
        registerPlayer,
        deletePlayer,
        updatePlayer,
        getPlayerNames,
        getAllPlayersSerialized,
        getPlayerCount,
        startEngineIfNotRunning,
        stopEngineIfRunning,
        ticker,
        getPlayer
    }

})()
