import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

import BookItem from "./BookItem";

import { BOOKS_QUERY, BOOK_MUTATION } from "../queries";

const Book = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  const { data, loading, error } = useQuery(BOOKS_QUERY);

  const [createMutation] = useMutation(BOOK_MUTATION, {
    refetchQueries: [{ query: BOOKS_QUERY }],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation({
      variables: {
        title,
        year: parseInt(year),
      },
    });
    setTitle("");
    setYear("");
  };

  const handleDelete = (id) => {
    deleteMutation({ variables: { id } });
    console.log("book deleted");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      <div className="col-6" style={{ margin: "0 auto" }}>
        <h1 className="mb-4 text-center">Add Book</h1>
        <Form
          onSubmit={handleSubmit}
          style={{ width: "360px", margin: "0 auto" }}
        >
          <div className="mb-5">
            <Form.Group className="mb-3" controlId="title">
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Tenggelamnya Kapal Van Der Wijck"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="year">
              <Form.Control
                value={year}
                onChange={(e) => setYear(e.target.value)}
                type="number"
                placeholder="1990"
                required
              />
            </Form.Group>
            <div className="d-grid">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </Form>
      </div>
      <table
        className="table table-bordered"
        style={{ width: "480px", margin: "0 auto" }}
      >
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.books.map((book) => (
            <BookItem key={book.id} book={book} />
            // <button
            //   type="button"
            //   key={book.id}
            //   className="list-group-item list-group-item-action d-flex justify-content-between"
            //   onClick={() => handleDelete(book.id)}
            // >
            //   {book.title} <strong>{book.year}</strong>
            // </button>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Book;
