import React, {Component} from 'react';

export default class AddButton extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isModalOpen: false
  //   };
  // }


  render() {
    return(
    <div className="add-button">
      <button onClick={this.props.click}><i className="fa fa-plus fa-2x"/></button>
    </div>

    );
  }
}
