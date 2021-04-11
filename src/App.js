import "./styles.css";
import React from "react";

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      books: {},
      search: ""
    };
  }
  handleFilterSearch = (event) => {
    this.setState({
      search: event.target.value
    });
  };
  componentDidMount() {
    fetch("https://fakerapi.it/api/v1/books")
      .then((res) => res.json())
      .then(
        (results) => {
          this.setState({
            isLoaded: true,
            books: results.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  render() {
    const { error, isLoaded, books, search } = this.state;

    if (error) {
      return <div>Oops! Please try again.</div>;
    } else if (!isLoaded) {
      return <div className="loading-text">Loading...</div>;
    } else {
      return (
        <>
          <div className="nav-bar">
            <div className="hed__wrap">
              <h1 className="hed">Find My Books</h1>
              <p className="hed-sub">
                Digital Library that finds your fav books.
              </p>
            </div>
            <div className="nav-search">
              <form>
                <label>Search</label>
                <input
                  name="search-book"
                  type="search"
                  value={this.state.search}
                  onChange={this.handleFilterSearch}
                  placeholder="Enter title or author here..."
                />
              </form>
            </div>
          </div>
          <div className="container">
            <div className="nav-search--mobile">
              <form>
                <input
                  name="search-book"
                  type="search"
                  value={this.state.search}
                  onChange={this.handleFilterSearch}
                  placeholder="Search title or author here..."
                />
              </form>
            </div>
            <h2 className="hed-sub">Library</h2>
            <ul className="library-list">
              {!search && books.length > 0 ? (
                books
                  .filter((book) => {
                    return (
                      book.title.toLowerCase().indexOf(search.toLowerCase()) !==
                        -1 ||
                      book.author
                        .toLowerCase()
                        .indexOf(search.toLowerCase()) !== -1
                    );
                  })
                  .map((book) => (
                    <li key={book.id}>
                      <div className="library-item">
                        <div className="library-item__img">
                          <img alt="book" src={book.image} />
                        </div>
                        <div className="library-item__info">
                          <p className="library-item__title">{book.title}</p>
                          <p>
                            by:{" "}
                            <span className="library-item__author">
                              {book.author}
                            </span>
                          </p>
                        </div>
                      </div>
                    </li>
                  ))
              ) : (
                <div className="search-error">
                  Oops! We cannot find what you are searching. Make sure you do
                  not have any typos.
                </div>
              )}
            </ul>
          </div>
        </>
      );
    }
  }
}

export default Library;
