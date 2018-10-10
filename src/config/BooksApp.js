import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from "../component/Home";
import Search from "../component/Search";
import * as BooksAPI from '../config/BooksAPI'

class RouterConfig extends React.Component {
  state = {
    books: []
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

  componentDidMount() {
    BooksAPI.getAll().then(res => {
      this.setState({
        books: res
      })
    }).catch(error => alert(error))
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <Home onBookStatusChanged={this.onBookStatusChanged} books={this.state.books}/>} />
          <Route exatc path="/search" render={() => <Search onBookStatusChanged={this.onBookStatusChanged} books={this.state.books}/>} />
        </div>
      </Router>
    )
  }
}
export default RouterConfig;