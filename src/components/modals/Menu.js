import React, { Component } from 'react';
import { Link } from 'react-router';
import onClickOutside from 'react-onclickoutside';
import auth from '../../auth';
import './Menu.css';


class Menu extends Component {
  constructor() {
    super();

    this.state = {};
  }
  
  handleClickOutside = () => {
    this.props.closeMenu();
  }
  
  componentDidMount() {
    this._fetchAvatar();
  }

  _fetchAvatar = () => {
    var that = this;
    auth.getMe(auth.getToken())
    .then((res) => {
      that.setState({ gravatar: res.body.avatarUrl})
    })
  }
  
  //The original component did mount function!
  // componentDidMount(){
  //   var token = auth.getToken();
  //   var that = this;
  //   auth.getMe(token)
  //   .then((res) => {
  //     that.setState({ gravatar: res.body.avatarUrl}) });
  // }

  render() {
    let { closeMenu, show } = this.props;
    const isLoggedIn = auth.isLoggedIn();
    return (
      <div className={`menu ${show?"show":""}`}>

        <div className="menu__header">
          <img src={this.state.gravatar} alt="profile-pic" className="menu__avatar"/>
        </div>

        <div className="menu__list">

          <Link to="/" className="menu__item" onClick={closeMenu}>
            Home
          </Link>

          {!isLoggedIn ?
            <Link to="/login" className="menu__item" onClick={closeMenu}>
              Login
            </Link>
          : null}

          {!isLoggedIn ?
            <Link to="/signup" className="menu__item" onClick={closeMenu}>
              Signup
            </Link>
          : null}

          {isLoggedIn ?
            <Link to="/logout" className="menu__item" onClick={closeMenu}>
              Logout
            </Link>
          : null}
        </div>

      </div>
    );
  }

}

export default onClickOutside(Menu);
