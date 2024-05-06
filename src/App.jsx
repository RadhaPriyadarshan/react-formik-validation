import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import BookForm from './BookForm.jsx';
import AuthorForm from './AuthorForm.jsx';
import BookList from './BookList.jsx';
import AuthorList from './AuthorList.jsx';
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: 'Book 1', author: 'Author 1', isbn: '1234567890', publicationDate: '2022-01-01' },
    { id: 2, title: 'Book 2', author: 'Author 2', isbn: '0987654321', publicationDate: '2022-02-01' },
  ]);

  const [authors, setAuthors] = useState([
    { id: 1, name: 'Author 1', birthDate: '1990-01-01', biography: 'sample text of Author 1 biography' },
    { id: 2, name: 'Author 2', birthDate: '1995-02-01', biography: 'sample text of Author 2 biography' },
  ]);

  const addBook = (book) => {
    setBooks(prevBooks => [...prevBooks, { ...book, id: prevBooks.length + 1 }]);
  };

  const editBook = (id, updatedBook) => {
    setBooks(prevBooks => prevBooks.map(book => (book.id === id ? { ...book, ...updatedBook } : book)));
  };

  const deleteBook = (id) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };

  const addAuthor = (author) => {
    setAuthors(prevAuthors => [...prevAuthors, { ...author, id: prevAuthors.length + 1 }]);
  };

  const editAuthor = (id, updatedAuthor) => {
    setAuthors(prevAuthors => prevAuthors.map(author => (author.id === id ? { ...author, ...updatedAuthor } : author)));
  };

  const deleteAuthor = (id) => {
    setAuthors(prevAuthors => prevAuthors.filter(author => author.id !== id));
  };

  return (
    <Router>
      <Container className="py-4">
        <Row>
          <Col md={1}>
          <div className="sidebar">
          <Row  className="gx-6">
            <Col xs={6} className="text-center" md={12}>
              <div className="circle"><NavLink to="/books"><i className="bi bi-book h1"></i></NavLink></div>
            </Col>
            <Col xs={6} className="text-center" md={12}>
              <div className="circle"><NavLink to="/authors"> <i className="bi bi-person h1"></i></NavLink></div>
            </Col>
          </Row>
        </div>
          </Col>
          <Col md={11}>
            <Routes>
              <Route path="/books" element={<BookList books={books} deleteBook={deleteBook} editBook={editBook} />} />
              <Route path="/authors" element={<AuthorList authors={authors} deleteAuthor={deleteAuthor} editAuthor={editAuthor} />} />
              <Route path="/books/add" element={<BookForm onSubmit={addBook} />} />
              <Route path="/authors/add" element={<AuthorForm onSubmit={addAuthor} />} />
              <Route path="/books/edit/:id" element={<BookForm onSubmit={editBook} isEdit />} />
              <Route path="/authors/edit/:id" element={<AuthorForm onSubmit={editAuthor} isEdit />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
