import React from 'react'
import Book from "./Book";

class BookShelf extends React.Component {

  render() {
    let { books, shelf, onBookStatusChanged, name } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.filter(book => book.shelf === shelf)
                .map((book, index) => {
                  return <li key={index}>
                    <Book books={books} onChange={onBookStatusChanged} data={book} />
                  </li>
                })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
