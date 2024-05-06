import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';

export default function BookList({ books, deleteBook, editBook }) {
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (id, book) => {
    setEditingBook({ id, ...book });
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  const handleSave = () => {
    if (editingBook) {
      editBook(editingBook.id, editingBook);
      setEditingBook(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingBook({ ...editingBook, [name]: value });
  };

  return (
    <div>
      <h2><i className="bi bi-book"></i> Book List</h2>
      {books.map(book => (
        <Card key={book.id} className="mb-3">
          <Card.Body>
            {editingBook && editingBook.id === book.id ? (
              <Form>
                <Form.Group controlId="formBasicTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" value={editingBook.title} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicAuthor">
                  <Form.Label>Author</Form.Label>
                  <Form.Control type="text" name="author" value={editingBook.author} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicISBN">
                  <Form.Label>ISBN</Form.Label>
                  <Form.Control type="text" name="isbn" value={editingBook.isbn} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPublicationDate">
                  <Form.Label>Publication Date</Form.Label>
                  <Form.Control type="text" name="publicationDate" value={editingBook.publicationDate} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="secondary" onClick={handleCancelEdit} className="ml-2">
                  Cancel
                </Button>
              </Form>
            ) : (
              <>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>Author: {book.author}</Card.Text>
                <Card.Text>ISBN: {book.isbn}</Card.Text>
                <Card.Text>Publication Date: {book.publicationDate}</Card.Text>
                <Button variant="danger" onClick={() => deleteBook(book.id)}>Delete</Button>
                <Button variant="primary" onClick={() => handleEdit(book.id, book)} className="ml-2">
                  Edit
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      ))}
      <Link to="/books/add" className="btn btn-success">Add Book</Link>
    </div>
  );
}
