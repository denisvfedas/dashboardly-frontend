import React, {Component} from 'react';
import './SignUp.css';
import auth from '../../auth';

const ENTER = 13;

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  _handleSignUp = () => {
    // deep destructuring equivalent to (let email = this.refs.email.value;)
    let { email: {value: email}, password: {value: password} } = this.refs;
    if (email && password) {
      
      auth.signup(email, password)
      .then(res => this.props.router.push('/login'))
      .catch(console.error)
    }
    else {
      this.setState({ error: "Please enter an email and password"})
    }
  }
  
  _handleTyping = (e) => {
    if (this.state && this.state.error) {
      this.setState({ error: null })
    }
    if (e.keyCode===ENTER) {
      this._handleSignUp()
    }
  }

  render() {
    return (
      <div className="signup">
        <input type="text" ref="email"
          onKeyUp={this._handleTyping}
        />
        <input type="password" ref="password"
          onKeyUp={this._handleTyping}
        />
        <button onClick={this._handleSignUp}>signup</button>
      </div>
    );
  }

}
