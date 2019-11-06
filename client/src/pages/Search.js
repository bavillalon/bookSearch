import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
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

  addBook = event => {
    console.log(event.target.value);
    API.saveBook(this.state.books.filter((book) => (book.googleId===event.target.value)))
    .then(response => {
      console.log(response);
      this.setState({books:this.state.books.filter(book => (response.data[0].googleId!=book.googleId))})
    })
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
          this.setState({ books: res.data.map((book) => (
            {
              title: book.volumeInfo.title,
              authors: book.volumeInfo.authors||["NA"],
              description: book.volumeInfo.description||"No Description",
              thumbnail: book.volumeInfo.imageLinks?book.volumeInfo.imageLinks.thumbnail:"https://placehold.it/300x300",
              link: book.volumeInfo.canonicalVolumeLink,
              googleId: book.id
            }
          )) })
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="12">
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
        </Row>
        <Row>
          <Col size="12">
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book.googleId}>
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
                    <button className="btn btn-primary" onClick={this.addBook} value={book.googleId}>
                      Add to Reading List
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

export default Search;
