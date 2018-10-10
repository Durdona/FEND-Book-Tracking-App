import React from 'react'
import '../App.css'
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

class Home extends React.Component {

  render() {
    let { books, onBookStatusChanged } = this.props;
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf onBookStatusChanged={onBookStatusChanged} books={books} shelf="currentlyReading" name="Currently Reading" />
              <BookShelf onBookStatusChanged={onBookStatusChanged} books={books} shelf="wantToRead" name="Want To Read" />
              <BookShelf onBookStatusChanged={onBookStatusChanged} books={books} shelf="read" name="Read" />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
