import React from 'react'

class Book extends React.Component {

  render() {
    let {data, books} = this.props;
    let currentShelf = "none";
    for (let item of books) {
      if (item.id === data.id) {
        currentShelf = item.shelf;
        break;
      }
    }
      
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${data.imageLinks?data.imageLinks.thumbnail:null})"` }}></div>
          <div className="book-shelf-changer">
            <select value={currentShelf} className="status" name="status" onChange={(event)=> this.props.onChange(data,event.target.value)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{data.title}</div>
        <div className="book-authors">{data.author}</div>
      </div>
    )
  }
}

export default Book;
