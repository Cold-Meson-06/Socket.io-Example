


//The files relative path
let filesLocation = `${__dirname}\\client\\`

//Require dependencies
const app = require('express')()
const http = require('http').Server(app)

//Store the port
const port = 6060

//Start the server
http.listen(port, () => console.log(`listening on *:${port}`))

//Serve Files
app.get('*', (request, response) => {
  response.sendFile(`${filesLocation}${request.url}`)
})
