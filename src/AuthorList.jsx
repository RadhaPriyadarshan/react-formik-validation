import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';

export default function AuthorList({ authors, deleteAuthor, editAuthor }) {
  const [editingAuthor, setEditingAuthor] = useState(null);

  const handleEdit = (id, author) => {
    setEditingAuthor({ ...author });
  };

  const handleCancelEdit = () => {
    setEditingAuthor(null);
  };

  const handleSave = () => {
    if (editingAuthor) {
      editAuthor(editingAuthor.id, editingAuthor);
      setEditingAuthor(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingAuthor(prevAuthor => ({
      ...prevAuthor,
      [name]: value
    }));
  };

  return (
    <div>
      <h2><i className="bi bi-person"></i> Author List</h2>
      {authors.map(author => (
        <Card key={author.id} className="mb-3">
          <Card.Body>
            {editingAuthor && editingAuthor.id === author.id ? (
              <Form>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={editingAuthor.name} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicBirthDate">
                  <Form.Label>Birth Date</Form.Label>
                  <Form.Control type="text" name="birthDate" value={editingAuthor.birthDate} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicBiography">
                  <Form.Label>Biography</Form.Label>
                  <Form.Control as="textarea" rows={3} name="biography" value={editingAuthor.biography} onChange={handleChange} />
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
                <Card.Title>{author.name}</Card.Title>
                <Card.Text>Birth Date: {author.birthDate}</Card.Text>
                <Card.Text>Biography: {author.biography}</Card.Text>
                <Button variant="danger" onClick={() => deleteAuthor(author.id)}>Delete</Button>
                <Button variant="primary" onClick={() => handleEdit(author.id, author)} className="ml-2">
                  Edit
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      ))}
      <Link to="/authors/add" className="btn btn-success">Add Author</Link>
    </div>
  );
}
