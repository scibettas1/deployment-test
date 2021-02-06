import axios from "axios";

export default {
  // Gets book by title
  getBookTitle: function(bookTitle) {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q="+ bookTitle +"&key=AIzaSyDL8Zn12A-6X87qg1m0tRLJn46zI2qQfUo");
  },
  // Gets books by Autor
  // getBookAuthor: function() {
  //   return axios.get("/https://www.googleapis.com/books/v1/volumes?q="+ bookAuthor +"&key=AIzaSyDL8Zn12A-6X87qg1m0tRLJn46zI2qQfUo");
  // },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};


//https://www.googleapis.com/books/v1/volumes?q="+ bookTitle +"&key=AIzaSyDL8Zn12A-6X87qg1m0tRLJn46zI2qQfUo