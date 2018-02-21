import React, {Component} from 'react';

class ChartBar extends Component {

  constructor(props) {
    super(props);
    this.state ={
      username:"Anonymous",
      content:""
    }
  };


  render() {
    console.log(`rendering <ChatBar/>`);
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)" onBlur={this.notifyUserName}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this._changeNewMessage} onKeyPress={this.notifyMessage}/>
      </footer>
    );
  };

  _changeNewMessage=(event)=>{this.setState({content:event.target.value})};



  notifyMessage=(event)=>{
    if(event.key==='Enter'){
          this.props.onNewMessage(this.state.content);
          this.state.content = "";
    };
  };

  notifyUserName=(event)=>{
    this.props.onNewUsername(event.target.value)
  };


};
export default ChartBar;