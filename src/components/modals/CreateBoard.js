import React, {Component} from 'react';
import './CreateBoard.css';
import api from '../../api';

const ENTER = 13;

export default class CreateBoard extends Component {
  constructor(props) {
    super(props);
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
      api.createBoard(title, description)
      .then(res => console.log(res))
      //.then(res => this.props.router.push('/'))
      .catch(console.error)
    }
    else {
      this.setState({ error: "Please enter an email and password"})
    }
  }

  render() {
    return (
      <div>
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
