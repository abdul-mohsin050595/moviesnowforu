import { Pagination } from "react-bootstrap";

const PaginationComp = ({ page, setPage, pageCount }) => {
  const createPaginationItem = (i) => {
    return (
      <Pagination.Item key={i} active={i === page} onClick={() => pageClick(i)}>
        {i}
      </Pagination.Item>
    );
  };

  const paginationItems = () => {
    let items = [];

    for (
      let number = page;
      number <= pageCount && number <= page + 2;
      number++
    ) {
      items.push(createPaginationItem(number));
    }
    if (items.every((item) => item.key !== "1")) {
      items.unshift(<Pagination.Ellipsis />);
      items.unshift(createPaginationItem(1));
    }

    if (items.every((item) => +item.key !== pageCount)) {
      items.push(<Pagination.Ellipsis />);
      items.push(createPaginationItem(pageCount));
    }

    return items;
  };

  const pageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const prevPage = async () => {
    await setPage((page) => page - 1);
  };

  const nextPage = async () => {
    await setPage((page) => page + 1);
  };

  return (
    <div className="d-flex justify-content-center align-item-center mt-2 mb-2 p-4">
      <Pagination size="md">
        <Pagination.Prev disabled={page === 1} onClick={() => prevPage()} />
        {...paginationItems()}
        <Pagination.Next
          disabled={page === pageCount}
          onClick={() => nextPage()}
        />
      </Pagination>
    </div>
  );
};

export default PaginationComp;
