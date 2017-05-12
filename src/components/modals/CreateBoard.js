import React, {Component} from 'react';
import './CreateBoard.css';
import api from '../../api';
import auth from '../../auth';
import onClickOutside from 'react-onclickoutside';

const ENTER = 13;

class CreateBoard extends Component {
  constructor() {
    super();
    this.state = {};
  }
  
   _handleTyping = (e) => {
    if (this.state && this.state.error) {
      this.setState({ error: null })
    }
    if (e.keyCode===ENTER) {
      this._handleCreateBoard()
    }
  }
  
  _handleCreateBoard = () => {
    // deep destructuring equivalent to (let email = this.refs.email.value;)
    let { title: {value: title}, description: {value: description} } = this.refs;
    if (title && description) {
      api.createBoard(title, description, auth.getToken())
      .then(res => this.props.router.push(`/boards/${res.body[0].id}`))
      .catch(console.error)
    }
    else {
      this.setState({ error: "Please enter a title and description"})
    }
  }
  
  handleClickOutside = () => {
    this.props.closeModal();
  }
  

  render() {
    let {show} = this.props;
    // console.log(show, "show")
    return (
      <div className={`createBoard ${show?"show":""}`}>
        <h1>Create Board</h1>
        <input type="text" ref="title"
          onKeyUp={this._handleTyping}
        />
        <input type="text" ref="description"
          onKeyUp={this._handleTyping}
        />
        <button onClick={this._handleCreateBoard}>Create</button>
      </div>
    );
  }

}


export default onClickOutside(CreateBoard);