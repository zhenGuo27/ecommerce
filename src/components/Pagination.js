const Pagination = (props) => {
  const PageItem = (props) => {
    const items = [];
    const { start, end } = getPageItemRange(props.page);
    for (let i = start; i <= end; i++) {
      items.push(
        <li
          className={i === props.page.currentPage ? "active" : ""}
          key={"pageItem_" + i}
          onClick={clickHandler.bind(null, props.pageSize, i)}
        >
          <a>{i}</a>
        </li>
      );
    }
    return items;
  };

  const getPageItemRange = (data) => {
    let modResult = data.currentPage % props.pageRange;
    modResult = modResult === 0 ? props.pageRange : modResult;
    let start = data.currentPage - (modResult - 1);
    let end = data.currentPage + (props.pageRange - modResult);
    end = end > data.totalPage ? data.totalPage : end;

    return {
      start,
      end,
    };
  };

  const clickHandler = (size, page) => {
    props.handler(size, page);
  };

  return (
    <div className="pagination">
      <ul>
        {props.page.previous && (
          <li className="previous">
            <a href="#">
              <i className="fa fa-caret-left" aria-hidden="true"></i>
            </a>
          </li>
        )}
        <PageItem page={props.page} size={props.pageSize}/>
        {props.page.next && (
          <li className="next">
            <a href="#">
              <i className="fa fa-caret-right" aria-hidden="true"></i>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
