//I like to use node servers on electron
//but not allways
let filesLocation = `${__dirname}\\client\\`

//Require dependencies
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

//Store the port
const port = process.env.PORT || 8080

//To store connections
const users = {}

//Start the server
http.listen(port, () => console.log(`listening on *:${port}`))

//Serve Files
app.get('*', (request, response) => {
  console.log(`Intercepting request: "${request.url}"`)
  response.sendFile(`${filesLocation}${request.url}`)
})

//register the `on connection` event to handle new users
io.on('connection', newUserSocket => {

  //To send a message to all other users
  //Inclusive the sender!
  newUserSocket.on('chat_message', msg => {
    io.emit('chat_message', msg)
    console.log(`Broadcasting message of: "${msg.sender}", "${msg.text}".`)
  })

  //To register the new user (just called once (now))
  newUserSocket.on('new_user', (name, callback) => {
    newUserSocket.name = name
    users[name] = true
    callback(users)
    console.log(`New user :${name}.`)
    io.emit('update_users', users)
  })
  
  //To handle connection lost, maybe the user was died
  newUserSocket.on('disconnect', () => {
    delete users[newUserSocket.name]
    console.log(`The user ${newUserSocket.name} was disconected.`)
    io.emit('update_users', users)
  })

})
