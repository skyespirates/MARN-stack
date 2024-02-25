import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { useState, Suspense, useEffect } from "react";

// components
import TableRow from "../components/TableRow";
import BookModal from "../components/BookModal";
import EditBook from "../components/EditBook";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

import { useSuspenseQuery } from "@apollo/client";
import { BOOKS_QUERY } from "../queries";

const size = 2;

const Books = () => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openEdit = () => setEdit(true);
  const closeEdit = () => setEdit(false);
  const { data } = useSuspenseQuery(BOOKS_QUERY);

  const [page, setPage] = useState(1);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(size);

  const totalPages = Math.ceil(data.books.length / size);

  // const temp = data.books.slice(from, to);
  // console.log(temp);

  useEffect(() => {
    const f = (page - 1) * size;
    const t = f + size;

    setFrom(f);
    setTo(t);
  }, [page]);

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
          <EditBook show={edit} handleClose={closeEdit} />
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
            <Suspense fallback={<Loader />}>
              {data.books.length > 0 &&
                data.books
                  .slice(from, to)
                  .map((record, i) => (
                    <TableRow
                      key={record.id}
                      record={record}
                      no={i + 1}
                      openEdit={openEdit}
                    />
                  ))}
            </Suspense>
          </tbody>
        </Table>
        <Suspense fallback={<></>}>
          <div className="d-flex justify-content-center ">
            <Pagination totalPages={totalPages} page={page} setPage={setPage} />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default Books;
