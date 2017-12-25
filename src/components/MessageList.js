import React, {Component} from 'react';
import './MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      username: '',
      content: '',
      sentAt: '',
      roomId: ''
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(message)});
    });
  }

  render() {
    return(
      <section className='message-area'>
        <ul className='message-list'>
          {
            this.state.messages.map((message) => {
              if (message.roomId === this.props.activeRoom)
                return (<li className='messages' key={message.key}>{message.content} {message.sentAt} {message.username}</li>)
              else
                return null;
            })
          }
        </ul>
      </section>
    );
  }
}

export default MessageList;
