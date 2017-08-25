//Get the elements
const chatInput = C$("#chatInput")
const btnSend = C$("#btnSend")
const messageBox = C$("#messageBox")
const userList = C$("#userList")

btnSend.onclick = e => {
    const text = chatInput.value    //Get the text
    chatInput.value = ""    //Clear the input
    send(text)      //Send
}

socket.on('chat_message', msg => {
    messageBox.innerHTML += `<p><spam class="username">${msg.sender}</spam>: ${msg.text}<p>`    //Append a new message
    messageBox.scrollTo(0, messageBox.scrollHeight)     //Scroll messagebox to bottom
})

socket.on('update_users', (users) => {
    const activeUsers = Object.keys(users).map(u => `<spam class="name">${u}</spam>`)   //Get all users and create a line   
    userList.innerHTML = `<p>${activeUsers.join(" ")}</p>`  //Put the line
})
