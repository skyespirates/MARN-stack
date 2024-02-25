import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useMutation } from "@apollo/client";

import { useState } from "react";

import years from "../utils/years";

import { BOOKS_QUERY, BOOK_MUTATION } from "../queries";

const BookModal = ({ show, handleClose }) => {
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [author, setAuthor] = useState("");
  const [validated, setValidated] = useState(false);

  const [createMutation, { loading, error }] = useMutation(BOOK_MUTATION);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      createMutation({
        variables: {
          title,
          year: parseInt(releaseDate),
          author,
        },
        refetchQueries: [BOOKS_QUERY],
        onCompleted: () => {
          setTitle("");
          setReleaseDate("");
          setAuthor("");
          handleClose();
          setValidated(false);
        },
      });
    }

    setValidated(true);
  };

  const closeModal = () => {
    setTitle("");
    setReleaseDate("");
    setAuthor("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="myForm"
        >
          <Form.Group className="mb-3" controlId="id">
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" disabled />
          </Form.Group>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Hamlet"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="releaseYear">
            <Form.Label>Release Year</Form.Label>
            <Form.Select
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              aria-label="Select release year"
              required
            >
              <option value="">Release Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              placeholder="William Shakespeare"
              required
            />
          </Form.Group>
          {error && (
            <p className="lead text-danger text-end">{error.message}</p>
          )}
          <Form.Group className="mb-3 d-flex justify-content-end column-gap-2 ">
            <Button disabled={loading} variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button disabled={loading} type="submit" variant="primary">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookModal;
