window.userName = prompt('Digite uma ID')

//Init socket.io
const socket = io()

//Define the function to send a message
const send = msg => {
    const message = { text: msg, sender: userName }
    console.log(`Sending Message: "${message.text}".`)
    socket.emit('chat_message', message)
}

//Registrer a function to receive an message
socket.on('chat_message', msg => {
    console.log(`Receiving message of: "${msg.sender}", "${msg.text}".`)
})

//Registrer a function to handle connection lost
socket.on('disconnect', () => location.reload())

//Emit the new user event to the server
socket.emit('new_user', window.userName, (users) => {
    Log('Você está agora conectado', users)
})
