import React from 'react'

class Book extends React.Component {

  render() {
    let {data} = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${data.imageLinks.thumbnail})"` }}></div>
          <div className="book-shelf-changer">
            <select className="status" name="status" onChange={(event)=> this.props.onChange(data,event.target.value)}>
              <option value="move">Move to...</option>
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

export default Book
