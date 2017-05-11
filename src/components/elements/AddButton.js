import React, {Component} from 'react';

export default class AddButton extends Component {

  _handleOnClick = () => {
    console.log("Click!");
  }

  render() {
    return(
    <div className="add-button">
      <button onClick={this._handleOnClick}><i className="fa fa-plus fa-2x"/></button>
    </div>
    );
  }
}
