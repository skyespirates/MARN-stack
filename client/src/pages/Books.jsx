import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { useState } from "react";

import TableRow from "../components/TableRow";
import BookModal from "../components/BookModal";
import EditBook from "../components/EditBook";

import { useQuery } from "@apollo/client";
import { BOOKS_QUERY } from "../queries";

const Books = () => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openEdit = () => setEdit(true);
  const closeEdit = () => setEdit(false);

  const temp = {
    author: "Tere Liye",
    id: "65d824e7a2646921d3dd5301",
    title: "bumi",
    year: 2011,
    __typename: "Book",
  };

  const { data, loading, error } = useQuery(BOOKS_QUERY);

  return (
    <div>
      <div>
        <h1 className="text-center">Books</h1>{" "}
        <div className="my-3 ">
          <Button variant="secondary" onClick={handleShow}>
            Add Book
          </Button>
        </div>
        <div>
          <BookModal show={show} handleClose={handleClose} />
          <EditBook record={temp} show={edit} handleClose={closeEdit} />
        </div>
        <Table bordered>
          <thead>
            <tr>
              <th className="text-center" style={{ width: "48px" }}>
                #
              </th>
              <th style={{ width: "" }}>Title</th>
              <th className="text-center" style={{ width: "120px" }}>
                Release Year
              </th>
              <th style={{ width: "200px" }}>Author</th>
              <th className="text-center" style={{ width: "101px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td valign="middle" colSpan={5}>
                  <p className="text-center mb-0">Loading..</p>
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td valign="middle" colSpan={5}>
                  <p className="text-center mb-0">{error.message}</p>
                </td>
              </tr>
            )}

            {data &&
              data.books.map((record, i) => (
                <TableRow
                  key={record.id}
                  record={record}
                  no={i + 1}
                  openEdit={openEdit}
                />
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Books;
