import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from "./Book";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    searchQuery: '',
    searchResult: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(res => {
      this.setState({
        books: res
      })
    }).catch(error => alert(error))
  }

  onBookStatusChanged = (book, shelf) => {
    BooksAPI.update(book, shelf).then((respon) => {
      BooksAPI.getAll().then(res => {
        this.setState({
          books: res
        })
      }).catch(error => alert(error))
    }).catch(error => alert(error))
  }

  onSearch = (value) => {
    this.setState({
      searchQuery: value
    });
    setTimeout(
      () => {
        BooksAPI.search(value).then((res) => {
          if (!res || res.error) {
            this.setState({
              error: true
            })
          }
          else {
            this.setState({
              error: false,
              searchResult: res
            })
          }
        })
      }, 500);
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input value={this.state.searchQuery} onChange={(event => this.onSearch(event.target.value))} type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              {
                this.state.error ?
                  <h1> No Result Found</h1> :
                  <ol className="books-grid">
                    {this.state.searchResult && this.state.searchResult.map((current, index) => {
                      return <li key={index}>
                        <Book onChange={this.onBookStatusChanged} data={current} />
                      </li>
                    })}
                  </ol>
              }
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {
                          this.state.books.filter(book => book.shelf === "currentlyReading")
                            .map((book, index) => {
                              return <li key={index}>
                                <Book onChange={this.onBookStatusChanged} data={book} />
                              </li>
                            })
                        }
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {
                          this.state.books.filter(book => book.shelf === "wantToRead")
                            .map((book, index) => {
                              return <li key={index}>
                                <Book onChange={this.onBookStatusChanged} data={book} />
                              </li>
                            })
                        }
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {
                          this.state.books.filter(book => book.shelf === "read")
                            .map((book, index) => {
                              return <li key={index}>
                                <Book onChange={this.onBookStatusChanged} data={book} />
                              </li>
                            })
                        }
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
