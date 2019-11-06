import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import Thumbnail from "../components/Thumbnail"

class Books extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
              {this.state.books.map(book => (
                <ListItem key={book._id}>
                  <Link to={"/books/" + book.id}>
                    <h3>
                      {book.title} by {book.authors.join(", ")}
                    </h3>
                  </Link>
                  <a href={book.link} target="#">
                    <button className="btn btn-primary">
                      View on Google
                    </button>
                  </a>
                  <button className="btn btn-primary" onClick={() => this.deleteBook(book._id)} value={book._id}>
                    Delete
                  </button>
                  <article>
                    <h5>Synopsis</h5>
                    <Row>
                      <Col size="xs-4 sm-2">
                        <Thumbnail src={book.thumbnail} />
                      </Col>
                      <Col size="xs-8 sm-9">
                        <p>
                          {book.description}
                        </p>
                      </Col>
                    </Row>
                  </article>
                  
                </ListItem>
              ))}
                
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
