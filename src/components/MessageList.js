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
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: this.props.username,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }

  sendMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });

    this.setState({
      username: '',
      content: '',
      sentAt: '',
      roomId: ''
    });
  }

  formatTime(timestamp) {
    let d = new Date(timestamp);
    let hours = d.getHours();
    let minutes = "0" + d.getMinutes();
    return hours + ":" + minutes.substr(-2);
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
        <h2 className='room-name'>{this.props.activeRoomName}</h2>
        <ul className='message-list'>
          {
            this.state.messages.map((message) => {
              if (message.roomId === this.props.activeRoom)
                return (<li className='messages' key={message.key}>{message.content}   <i>{this.formatTime(message.sentAt)}</i> <br /><b>{message.username}</b></li>)
              else
                return null;
            })
          }
        </ul>
        <footer className='message-bar'>
          <form onSubmit={this.sendMessage}>
            <input className='message-content' type='textarea' value={this.state.content} placeholder='Enter message' onChange={this.handleChange} />
            <input className='message-send' type='submit' value='Send' />
          </form>
        </footer>
      </section>
    );
  }
}

export default MessageList;
