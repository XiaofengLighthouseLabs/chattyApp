// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

 wss.broadcast = (newMessage) => {
  console.log("broadcasted");
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newMessage));
      }
    });
  };

onlineUser=(onlineUser)=>{
  const countOnlineUser = {
      type:'countOnlineUser',
      onlineUser:wss.clients.size
   }
  wss.broadcast(countOnlineUser);
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
// At this point in time wss.clients is a Set that includes
// the ws objects of all clients, including the one who just connected.
// Read more about Sets at https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set
// Because it is a Set, you cannot use .length on it.
  onlineUser(onlineUser);
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () =>{console.log('Client disconnected')
    onlineUser(onlineUser);
    });
  // At this point in time wss.clients no longer contains the ws object
  // of the client who disconnected
   onlineUser(onlineUser);
});


wss.on('connection',  function connection(ws){
 ws.on('message', function incoming(msgStr){

    const color = ['#ff0000', '#000099', '#00cc00', '#ffff00', '#660066', '#666699', '#333300','#ff0066'];

    ws.color = color[Math.floor(Math.random()*color.length)];
    console.log(ws.color);
    const newMessage = JSON.parse(msgStr);
    console.log('received: ', newMessage);
    switch(newMessage.type){
      case"postMessage":
        newMessage.type = "incommingMessage";
        newMessage.id = uuidv4();
        newMessage.color = ws.color;
        wss.broadcast(newMessage);
      break;

      case"postNotification":
        newMessage.type="incommingNotification";
        wss.broadcast(newMessage);
      break;
    throw new Error("Unknown event type " + data.type);

    }
  });
});