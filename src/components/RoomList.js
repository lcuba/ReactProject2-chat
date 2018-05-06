import React, {Component} from 'react';
import './RoomList.css';

class RoomList extends Component {
  constructor(props){
    super(props)

    this.state = {
      rooms: [],
      handleForm: false,
      newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.createRoom = this.createRoom.bind(this);
    this.formToggle = this.formToggle.bind(this);
  }

    componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({rooms: this.state.rooms.concat(room)});
      });
    }

    formToggle() {
      if (this.state.handleForm === true)
        this.setState({handleForm: false});
      else
        this.setState({handleForm: true});
    }

    createRoom(e) {
      e.preventDefault();
      const newRoom = e.target.elements.newRoomName.value;
      this.roomsRef.push({name: newRoom});
      this.setState({handleForm: false});
      e.target.elements.newRoomName.value = '';
    }

    selectRoom(room) {
      this.props.activeRoom(room)
    }

  render() {
    return (
      <section className='roomlist'>
        <h1 className='title'>React Chat</h1>
        <button className='new-room' onClick={this.formToggle}>New room</button>
        <ul className='sidebar-list'>
        {
          this.state.rooms.map((room, index) =>
            <li className='rooms' key={index} onClick={(e) => this.selectRoom(room, e)}>{room.name}</li>
        )}
        </ul>


        <div className={this.state.handleForm ? 'displayed' : 'hidden'}>
          <form onSubmit={this.createRoom}>
            <h2 className='form-title'>Create new room</h2>
            <h3 className='text-field-description'>Enter a room name</h3>
            <input
              type='text'
              id='new-room-name'
              name='newRoomName'
            />
            <br />
            <br />
            <button className='create-room' type='submit'>Create room</button>
            </form>
          <button className='cancel' onClick={this.formToggle}>Cancel</button>
        </div>
      </section>
    );
  }
}

export default RoomList;
