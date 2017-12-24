import React, {Component} from 'react';
import './User.css';

class User extends Component {

  login() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.props.setUser(user);
    });
  }

  logoff() {
    this.props.firebase.auth().signOut().then(() => {
      this.props.setUser(null);
    });
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  render() {
    return(
      <section className='user-set'>
        <button onClick={this.login.bind(this)}>Sign-in</button>
        <button onClick={this.logoff.bind(this)}>Sign-out</button>
      </section>
    );
  }
}

export default User;
