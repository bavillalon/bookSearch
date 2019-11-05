import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Thumbnail from "../components/Thumbnail"

class Search extends Component {
  state = {
    books: [],
    title: "",
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.searchBook(this.state.title)
        .then(res => {
          console.log(res.data)
          this.setState({ books: res.data })
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Search for Book!</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book.id}>
                    <Link to={"/books/" + book.id}>
                      <h3>
                        {book.volumeInfo.title} by {book.volumeInfo.authors.join(", ")}
                      </h3>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />

                    <article>
                      <h5>Synopsis</h5>
                      <Row>
                        <Col size="xs-4 sm-2">
                          <Thumbnail src={book.volumeInfo.imageLinks.thumbnail} />
                        </Col>
                        <Col size="xs-8 sm-9">
                          <p>
                            {book.volumeInfo.description}
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

export default Search;
