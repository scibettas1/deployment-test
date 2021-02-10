import React, { useState, useEffect } from "react";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

function Books() {
  // Setting our component's initial state
  const [bookResults, setBookResults] = useState([])
  const [title, setTitle] = useState("")

  //const book = books.items[0].volumeInfo

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBookTitle(title)
      .then(res => {
        setBookResults(res.data.items)
        console.log(bookResults)
        console.log(bookResults.volumeInfo.totalItems)
        console.log(bookResults.volumeInfo.title)
        console.log(bookResults.volumeInfo.authors[0])
        console.log(bookResults.volumeInfo.categories[0])
        console.log(bookResults.volumeInfo.description)
        console.log(bookResults.volumeInfo.publishedDate)
        console.log(bookResults.volumeInfo.imageLinks.thumbnail)
      }
      )
      .catch(err => console.log(err));
  };
  
  function saveBook(book) {
    console.log(book)
    API.saveBook({
      title: book.volumeInfo.title,
      author: book.volumeInfo.author,
      synopsis: book.volumeInfo.description
    })
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { value } = event.target;
    setTitle(value)
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (title) {
      loadBooks()
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>Search for a Book</h1>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col size="md-12">
          <form>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            <FormBtn
              onClick={handleFormSubmit}
            >
              Search
              </FormBtn>
          </form>
        </Col>
        </Row>
        <Row>
        <Col size="md-12">
          {bookResults.length ? (
            <List>
              {bookResults.map(book => {
                console.log(book.volumeInfo.title)
                    return (
                      <ListItem>
                      <strong>
                      {book.volumeInfo.title} by {book.volumeInfo.authors}
                    </strong>
                    <SaveBtn onClick={() => saveBook(book)}/>
                    </ListItem>
                    )
                    })}
            </List>

          ) : (
              <h3>No Results to Display</h3>
            )}
                        <br />
        </Col>
      </Row>
    </Container>
  );
}


export default Books;
