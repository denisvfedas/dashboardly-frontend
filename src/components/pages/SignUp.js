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
    var that = this;
    if (email && password) {
      
      auth.signup(email, password)
      .then(res => this.props.router.push('/login'))
      .catch(function(error){
        
          //for the password error
        if(error.response.body.errors){
          
          var message = error.response.body.errors.password[0];
          that.setState({error: message});
        }
        // console.log(error.response.body, "the message");
        message = error.response.body
        that.setState({error: message});
      })
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
        <h2>{this.state.error}</h2>
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
