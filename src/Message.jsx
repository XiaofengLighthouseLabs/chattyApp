import React, {Component} from 'react';

class Message extends Component {

  render() {
    console.log(`rendering <Message/>`);
    const content = this.props.mes.content;

    return (
      <div className="message">
        <span className="message-username" style={{color:this.props.mes.color}}>{this.props.mes.username}</span>
        <span className="message-content">
          { content.match(/^https?:\/\/.+\.(jpg|png|gif)$/) ? <img className="message-img"src={content}/> : content}
        </span>
      </div>
    );
  };
};
export default Message;