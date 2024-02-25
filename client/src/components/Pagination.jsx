import Pagination from "react-bootstrap/Pagination";

const Paginationx = ({ totalPages, page: currentPage, setPage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const prev = () => setPage(currentPage - 1);
  const next = () => setPage(currentPage + 1);
  const first = () => setPage(1);
  const last = () => setPage(totalPages);

  return (
    <Pagination>
      <Pagination.First disabled={currentPage === 1} onClick={first} />
      <Pagination.Prev disabled={currentPage === 1} onClick={prev} />
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          onClick={() => setPage(page)}
          active={currentPage === page}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next disabled={currentPage === totalPages} onClick={next} />
      <Pagination.Last disabled={currentPage === totalPages} onClick={last} />
    </Pagination>
  );
};

export default Paginationx;
