import React from 'react'
import { debounce } from "throttle-debounce";
import * as BooksAPI from '../config/BooksAPI'
import Book from "./Book";
import { Link } from "react-router-dom";

class Search extends React.Component {
  state = {
    searchQuery: '',
    searchResult: []
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

  fetchSearch = value => {
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
  }

    onSearch = (value) => {
      if (value) {
        this.setState({
          searchQuery: value
        }, () => {
          debounce(500, this.fetchSearch(this.state.searchQuery))
        });
      }
      else{
        this.setState({
          error:false,
          searchQuery: value,
          searchResult: []
        })
      }
    }

    render() {
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
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
                      <Book books={this.props.books} onChange={this.props.onBookStatusChanged} data={current} />
                    </li>
                  })}
                </ol>
            }
          </div>
        </div>
      )
    }
  }

  export default Search;
