import { useMutation } from "@apollo/client";
import {
  DELETE_BOOK_MUTATION,
  BOOKS_QUERY,
  EDIT_BOOK_MUTATION,
} from "../queries";
import { useState } from "react";

export default function BookItem({ book }) {
  const [deleteBookMutation] = useMutation(DELETE_BOOK_MUTATION, {
    refetchQueries: [{ query: BOOKS_QUERY }],
  });
  const deleteBook = () => {
    deleteBookMutation({
      variables: {
        id: book.id,
      },
    });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [year, setYear] = useState(book.year);
  const [editBookMutation] = useMutation(EDIT_BOOK_MUTATION, {
    refetchQueries: [{ query: BOOKS_QUERY }],
  });

  const saveChanges = () => {
    editBookMutation({
      variables: {
        id: book.id,
        title: title,
        year: +year,
      },
    });
    setIsEditing(false);
  };

  const discardChanges = () => {
    setIsEditing(false);
    setTitle(book.title);
    setYear(book.year);
  };

  return (
    <tr className="">
      <td>
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        ) : (
          book.title
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="form-control"
          />
        ) : (
          book.year
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button className="btn btn-success mr-2" onClick={saveChanges}>
              Save
            </button>
            <button className="btn btn-danger" onClick={discardChanges}>
              Cancel
            </button>
          </>
        ) : (
          <span
            className="d-flex justify-content-center gap-2"
            style={{ width: "100%" }}
          >
            <button
              className="btn btn-info mr-2"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button className="btn btn-danger" onClick={deleteBook}>
              Delete
            </button>
          </span>
        )}
      </td>
    </tr>
  );
}
