const socket = io()

//BUG: no global variables
let Players = {}

//BUG: remove main from set timeout
function Soc(){
    window.userName = prompt('Digite uma ID')
     
    document.body.removeChild(C$('#btn'))
    setTimeout(MAIN, 1000)

}

//BUG: no global variables
let connected = false

//The connection handler
const connect = e => {
    socket.emit('CL:try_to_join', window.userName, (players) => {
         
        for (let player of players) {
            Players[player.name] = new G.Player(player)
        }

        //BUG: no global variables
        connected = true
    })
}

//Just reload the page
socket.on('disconnect', () => location.reload())

const playerPositionChange = cam => {
    
    //BUG: reconstruct object 16 times/frame
    const message = {
        sender: userName,
        px: cam.position.x,
        py: cam.position.y,
        pz: cam.position.z,
        rx: cam.rotation.x,
        ry: cam.rotation.y,
        rz: cam.rotation.z,
    }
    socket.emit('CLT:updatePlayerPos', message)
}


const playerShoot = (data) => {
    socket.emit('CLT:player_shoot', data)
}

socket.on('SRV:player_jonied', newPlayer => {
    if(!connected){
        return
    }else if(newPlayer.name === window.userName){
        console.info("You just jonied the server")
    }else{
        Players[newPlayer.name] = new G.Player(newPlayer)
        console.log('New player in the server: ', newPlayer.name)
    }
})

socket.on('SRV:player_disconnect', (data) => {
    if(!connected){
        return
    }
    Players[data.playerName].disconnect()
    delete Players[data.playerName]
    console.log('the player ', data.playerName, ' was disconnected')
})

socket.on('SRV:sync_players', (changedPlayers) => {
    if (!connected){
        return
    }
    for (let playerName in changedPlayers) {
        let player = changedPlayers[playerName]
        Players[player.name].sync(player)
    }
})