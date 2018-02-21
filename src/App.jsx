import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const uuidv4 = require('uuid/v4');


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser:{
        name:'Anonymous'
      },
      messages: [],
      onlineUser:0
    }
  };

  componentDidMount(){
    console.log("componentDidMount<App/>");
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = (event) => {
      console.log("conneted to server");
    }

    this.socket.onmessage = (event) => {
      console.log(event.data);
      const newMessage = JSON.parse(event.data);
      console.log(newMessage)
        switch(newMessage.type){
          case"incommingMessage":
            const messages = this.state.messages.concat(newMessage);
            this.setState({messages:messages})
            break;

          case"incommingNotification":
            const notification = this.state.messages.concat(newMessage);
            this.setState({messages:notification})
          break;
          case"countOnlineUser":
            this.setState({onlineUser:newMessage.onlineUser})
            break;

        throw new Error("Unknown event type " + data.type);


        }
      }

    // setTimeout(()=>{
    //   console.log("Simulating incoming message");
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage);
    //   this.setState({messages:messages})
    // },3000);
  };


  addNewMessage=(content)=>{
    const newMessage = {
      type:"postMessage",
      username:this.state.currentUser.name,
      content:content
    }
    const newMessages = this.state.messages.concat(newMessage);
    // this.setState({messages:newMessages})
    this.socket.send(JSON.stringify(newMessage));
  };

  setCurrentUser=(newUsername)=>{
    if(newUsername !== this.state.currentUser.name){
       const notification = {
        type:"postNotification",
        content:`${this.state.currentUser.name} changed their name to ${newUsername}`
       }
      this.setState({currentUser:{name:newUsername}})
      this.socket.send(JSON.stringify(notification))
    };
  };

  postNotification=()=>{

  }

  render() {
    console.log('rendering<App/>')
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="countOnlineUser">{this.state.onlineUser} users online</span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar
          currentUser={this.state.currentUser}
          onNewUsername={this.setCurrentUser}
          onNewMessage={this.addNewMessage}/>
      </div>
    );
  }
}
export default App;
