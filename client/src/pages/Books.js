import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
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
        setBookResults(res.data)
        console.log(bookResults)
        console.log(bookResults.items[0].volumeInfo.totalItems)
        console.log(bookResults.items[0].volumeInfo.title)
        console.log(bookResults.items[0].volumeInfo.authors[0])
        console.log(bookResults.items[0].volumeInfo.categories[0])
        console.log(bookResults.items[0].volumeInfo.description)
        console.log(bookResults.items[0].volumeInfo.publishedDate)
        console.log(bookResults.items[0].volumeInfo.imageLinks.thumbnail)
      }
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  // function deleteBook(id) {
  //   API.deleteBook(id)
  //     .then(res => loadBooks())
  //     .catch(err => console.log(err));
  // }
  // function saveBook() {
  //   API.saveBook({
  //     title: formObject.title,
  //     author: formObject.author,
  //     synopsis: formObject.synopsis
  //   })
  //     .then(res => loadBooks())
  //     .catch(err => console.log(err));
  // }

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
console.log(bookResults.items)
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
              {bookResults.items.map(book => {
                console.log(book)
                    return (
                      <strong>
                      {book.title}
                    </strong>
                    )
                    
                    })}
            </List>
          ) : (
              <h3>No Results to Display</h3>
            )}
        </Col>
      </Row>
    </Container>
  );
}


export default Books;
