import React, {Component} from 'react';
import api from '../../api';
import BookmarkCard from '../elements/BookmarkCard';
import auth from '../../auth';
import './Board.css';
import AddButton from '../elements/AddButton';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      bookmarks: [],
      updatedAt: ""
    };
  }
  
  componentDidMount() {
    this.fetchBoardData()
    
  }
  
  fetchBoardData = () => {
      Promise.all([
        api.getBoard(this.props.params.id),
        api.getBookmarks(this.props.params.id)
      ])
      .then(res => {
        this.setState({
          title: res[0].body[0].title,
          description: res[0].body[0].description,
          bookmarks: res[1].body,
          boardId: res[0].body[0].id
        })
      })
      .then(()=> {
        return auth.getToken()
      })
      .then((res)=> {
        if(res === undefined){
          res = null;
        }
        this.setState({
          token: res
        })
      })
      .then(()=>{
        return auth.checkUserOwnsBoard(this.state.boardId, this.state.token)
      })
      .then((res)=>{
        //console.log(res, "Testing")
        this.setState({
          button: res
        })
      })
      .catch(console.error)
  }
  
  _handleOnClick = (event) => {
    
  }

  render() {
    let { bookmarks } = this.state
    //console.log(this.state.button)
    return (
      <div className="board">
        { bookmarks.map(b =>
          <BookmarkCard
            key={b.id}
            id={b.id}
            title={b.title}
            description={b.description}
            url={b.url}
          />
        )}
        {this.state.button ? <AddButton click={(event) => this._handleOnClick(event)}/> : null}
      </div>
    );
  }

}
