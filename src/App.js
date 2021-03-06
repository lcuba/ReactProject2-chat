import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

var config = {
  apiKey: "AIzaSyAhLVLsATlVKztfHMQJCR6OYKg5NzL__ss",
  authDomain: "bloc-chat-react-ae5aa.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-ae5aa.firebaseio.com",
  projectId: "bloc-chat-react-ae5aa",
  storageBucket: "bloc-chat-react-ae5aa.appspot.com",
  messagingSenderId: "644371644091"
};

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: '',
      username: ''
    };

    this.setUser = this.setUser.bind(this);
    this.activeRoom = this.activeRoom.bind(this);
    this.resetUser = this.resetUser.bind(this);
  }

  setUser(user) {
    this.setState({username: user});
  }

  resetUser() {
    this.setState({username: ''});
  }

  activeRoom(room) {
    this.setState({activeRoom: room});
  }

  render() {
    const showMessages = this.state.activeRoom;
    return (
      <div className="App">
        <main>
          <RoomList firebase={firebase} activeRoom={this.activeRoom}/>
          <User
            firebase={firebase}
            setUser={this.setUser}
            resetUser={this.resetUser}
          />
          <p>{`Welcome ${this.state.username.displayName ? this.state.username.displayName : ''}`}</p>
          <br />
          {showMessages ?
            (<MessageList firebase={firebase}
            activeRoom={this.state.activeRoom.key}
            activeRoomName={this.state.activeRoom.name}
            username={`${this.state.username.displayName ? this.state.username.displayName : 'User'}`} />)
            :
            (null)
          }
        </main>
      </div>
    );
  }
}

export default App;
