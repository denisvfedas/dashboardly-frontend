import React, {Component} from 'react';
import api from '../../api';
import BoardCard from '../elements/BoardCard';
import AddButton from '../elements/AddButton';
import auth from '../../auth';
import './Home.css';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: []
    };
  }
  
  componentDidMount() {
    this._fetchBoards(1, 9);
  }
  
  _fetchBoards = (page, limit) => {
    api.getBoardsList(page, limit)
    .then(res => {
      //console.log('res',res)
      this.setState({ boards: res.body })
    })
    .catch(console.error)
  }

  render() {
    let { boards } = this.state
    return (
      <div className="home">
        { boards.map(b =>
          <BoardCard
            key={b.id}
            id={b.id}
            title={b.title}
            description={b.description}
            updatedAt={b.updatedAt}
          />
        )}
        {auth.isLoggedIn() ? <AddButton /> : null}
      </div>
    );
  }

}
