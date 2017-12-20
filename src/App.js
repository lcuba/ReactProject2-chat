import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header>
          <h1 className='title'>Bloc Chat</h1>
        </header>
        <main>
          <RoomList firebase={this.firebase} />
        </main>
      </div>
    );
  }
}

export default App;
