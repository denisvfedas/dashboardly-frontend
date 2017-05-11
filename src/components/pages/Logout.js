import React, {Component} from 'react';
// import './Logout.css';
import auth from '../../auth';

export default class Logout extends Component{
    
    _handleLogout = () => {
    // deep destructuring equivalent to (let email = this.refs.email.value;)
      auth.logout()
      .then(res => this.props.router.push('/'))
      .catch(console.error)
    }
    
    componentDidMount() {
        this._handleLogout();
    }
    
    render() {
        return(
            <div>
                <h1>You are logged out</h1>
            </div>
        );
    }
    
    
}