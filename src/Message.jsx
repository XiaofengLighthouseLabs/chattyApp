import React, {Component} from 'react';

class Message extends Component {

  render() {
    console.log(`rendering <Message/>`);
    return (
      <div className="message">
        <span className="message-username" style={{color:this.props.mes.color}}>{this.props.mes.username}</span>
        <span className="message-content">{this.props.mes.content}</span>
      </div>
    );
  }
}
export default Message;