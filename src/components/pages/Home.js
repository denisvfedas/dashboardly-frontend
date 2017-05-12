import React, {Component} from 'react';
import api from '../../api';
import BoardCard from '../elements/BoardCard';
import AddButton from '../elements/AddButton';
import auth from '../../auth';
import './Home.css';
import CreateBoard from '../modals/CreateBoard';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      isModalOpen: false
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
  
  _handleOnClick(event){
    console.log("Click!")
    this.setState({ isModalOpen: !(this.state.isModalOpen)});
  }
  
  closeModal = () => this.setState({ isModalOpen: false })
  
  render() {
    let { boards, isModalOpen } = this.state
    console.log(isModalOpen)
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
        {auth.isLoggedIn() ? <AddButton click={(event) => this._handleOnClick(event)}/> : null}
        
        <CreateBoard show={isModalOpen} closeModal={this.closeModal}/>
      </div>
    );
  }

}
