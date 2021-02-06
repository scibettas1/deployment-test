import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState("")

  //const book = books.items[0].volumeInfo

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBookTitle(title)
      .then(res => {
        setBooks(res.data)
        console.log(books)
        console.log(books.totalItems)
        console.log(books.items[0].volumeInfo.title)
        console.log(books.items[0].volumeInfo.authors[0])
        console.log(books.items[0].volumeInfo.categories[0])
        console.log(books.items[0].volumeInfo.description)
        console.log(books.items[0].volumeInfo.publishedDate)
      }
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }
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
    const { name, value } = event.target;
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
          {books.length ? (
            <List>
              {books.map(books => (
                <ListItem key={books._id}>
                  <Link to={"/books/" + books._id}>
                    <strong>
                      {books.items[0].volumeInfo.title} by {books.items[0].volumeInfo.authors[0]}
                    </strong>
                  </Link>
                  <DeleteBtn onClick={() => deleteBook(books._id)} />
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


export default Books;
