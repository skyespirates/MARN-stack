import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useMutation } from "@apollo/client";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import years from "../utils/years";

import { BOOKS_QUERY, EDIT_BOOK_MUTATION as updateBook } from "../queries";

const EditBook = ({ show, handleClose }) => {
  const record = useSelector((state) => state.book.selectedBook);

  const [validated, setValidated] = useState(false);

  const [editBook, { loading, error }] = useMutation(updateBook);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const title = document.getElementById("title").value;
    const year = parseInt(document.getElementById("year").value);
    const author = document.getElementById("author").value;

    const data = {
      id: record.id,
      title,
      year,
      author,
    };

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      editBook({
        variables: {
          ...data,
        },
        refetchQueries: [BOOKS_QUERY],
        onCompleted: () => {
          handleClose();
          setValidated(false);
        },
      });
    }

    setValidated(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
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
            <Form.Control type="text" value={record.id} disabled />
          </Form.Group>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              defaultValue={record.title}
              type="text"
              placeholder="Hamlet"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="year">
            <Form.Label>Release Year</Form.Label>
            <Form.Select
              defaultValue={record.year}
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
              defaultValue={record.author}
              type="text"
              placeholder="William Shakespeare"
              required
            />
          </Form.Group>
          {error && (
            <p className="lead text-danger text-end">{error.message}</p>
          )}
          <Form.Group className="mb-3 d-flex justify-content-end column-gap-2 ">
            <Button
              disabled={loading}
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button disabled={loading} type="submit" variant="success">
              Update
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditBook;
