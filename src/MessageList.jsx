import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    console.log(`rendering <MessageList/>`);
    const messages = this.props.messages;
    const messageItems = messages.map((message, i) => (
        <Message mes={message} key={i}/>
      ));
    return (
      <main className="messages">
       {messageItems}
      </main>
    );
  }
}
export default MessageList;