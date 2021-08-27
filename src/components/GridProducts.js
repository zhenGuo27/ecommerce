import { Fragment, useEffect, useState } from "react";
import Pagination from "./Pagination";
import { getProducts } from "../actions/product-action";
import ProductRate from "./ProductRate";
import { useHistory } from "react-router-dom";

const intitPagination = {
  totalPage: 0,
  contentDataIndex: 0,
  currentPage: 1,
  currentLayer: 1,
  previous: false,
  next: false,
};

const pageSize = 6;
const pageRange = 5;

const GridProducts = (props) => {
  const history = useHistory();
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(intitPagination);
  const [noItems, setNoItems] = useState(false);

  useEffect(() => {
    pageHandler(pageSize, 1);
  }, []);

  useEffect(() => {
    const updated = { ...page };
    const dividedResult = productData.length / pageSize;
    const modResult = productData.length % pageSize;

    if (productData.length < pageSize) {
      updated.totalPage = 1;
    } else if (modResult !== 0) {
      updated.totalPage = dividedResult + 1;
    } else {
      updated.totalPage = dividedResult;
    }
    setPage(updated);
  }, [productData]);

  useEffect(() => {
    getProducts(1, JSON.stringify(props.filter)).then((items) => {
      if (items && items.products.length !== 0) {
        setNoItems(false);
        setProductData(items.products);
      } else {
        setProductData([]);
        setNoItems(true);
      }
    });
  }, [props.filter]);

  const pageHandler = (size, newPage) => {
    let updatedPagination = { ...page };
    updatedPagination.currentIndex = (newPage - 1) * size;
    updatedPagination.currentPage = newPage;
    updatedPagination.previous = newPage !== 1;
    updatedPagination.next = newPage !== updatedPagination.totalPage;

    const rangeDivided = newPage / pageRange;
    const rangeModulo = newPage % pageRange;
    updatedPagination.currentLayer =
      rangeModulo === 0 ? rangeDivided : rangeDivided + 1;

    setPage(updatedPagination);
  };

  const sortHandler = (event) => {
    const sort = parseInt(event.target.value, 10);
    getProducts(sort).then((items) => {
      if (items && items.products.length != 0) {
        setProductData(items.products);
      }
    });
  };

  const toProduct = (id) => {
    history.replace("/Product/" + id);
  };

  return (
    <Fragment>
      <div className="productList">
        {/*Toolbar*/}
        <button
          type="button"
          className="btn btn-filter d-block d-md-none d-lg-none"
        >
          Product Filters
        </button>
        <div className="toolbar">
          <div className="filters-toolbar-wrapper">
            <div className="row">
              <div className="col-6 col-md-6 col-lg-9 text-center filters-toolbar__item filters-toolbar__item--count d-flex justify-content-end align-items-center">
                <span className="filters-toolbar__product-count">
                  Showing: {productData && productData.length}
                </span>
              </div>
              <div className="col-6 col-md-6 col-lg-3 text-right">
                <div className="filters-toolbar__item">
                  <label htmlFor="SortBy" className="hidden">
                    Sort
                  </label>
                  <select
                    name="SortBy"
                    id="SortBy"
                    className="filters-toolbar__input filters-toolbar__input--sort"
                    value="1"
                    onChange={sortHandler}
                  >
                    <option value="1">Price, low to high</option>
                    <option value="2">Price, high to low</option>
                    <option value="3">Date, new to old</option>
                    <option value="4">Date, old to new</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*End Toolbar*/}
        {noItems && <h2>No Items Were Founded.</h2>}
        {!noItems && (
          <div className="grid-products grid--view-items">
            <div className="row">
              {productData &&
                productData.map((item) => {
                  const isSoldOut = item.sku.every(function (
                    item,
                    index,
                    array
                  ) {
                    return item.originalPrice * item.discount === 1;
                  });

                  const hasDiscount = item.sku.some(function (
                    item,
                    index,
                    array
                  ) {
                    return item.discount != 1;
                  });

                  const hasNew = item.sku.some(function (item, index, array) {
                    const diffInTime =
                      new Date().getTime() - new Date(item.startDate).getTime();
                    return diffInTime <= 5;
                  });

                  const productDiscount = hasDiscount ? (
                    <span className="lbl on-sale">
                      -{100 - item.sku[0].discount * 100}%
                    </span>
                  ) : null;

                  const productNew = hasNew ? (
                    <span className="lbl pr-label1">new</span>
                  ) : null;

                  const pItemClasses = isSoldOut
                    ? "col-6 col-sm-6 col-md-4 col-lg-4 item grid-view-item--sold-out"
                    : "col-6 col-sm-6 col-md-4 col-lg-4 item";

                  return (
                    <div className={pItemClasses} key={`product${item.id}`}>
                      {/* start product image */}
                      <div className="product-image" onClick={toProduct.bind(null, item.id)}>
                        {/* start product image */}
                        <a>
                          {/* image */}
                          <img
                            className="primary blur-up lazyload"
                            data-src={require("../" + item.largeImgs[0].src).default}
                            src={require("../" + item.largeImgs[0].src).default}
                            alt={item.title}
                            title={item.title}
                          />
                          {/* product label */}
                          <div className="product-labels rectangular">
                            {productDiscount}
                            {productNew}
                          </div>
                          {/* End product label */}
                        </a>
                        {/* end product image */}
                      </div>
                      {/* end product image */}

                      {/*start product details */}
                      <div className="product-details text-center">
                        {/* product name */}
                        <div className="product-name">
                          <a onClick={toProduct.bind(null, item.id)}>{item.title}</a>
                        </div>
                        {/* End product name */}
                        {/* product price */}
                        <div className="product-price">
                          <span className="old-price">
                            ${item.sku[0].originalPrice}
                          </span>
                          <span className="price">
                            $
                            {(
                              item.sku[0].originalPrice * item.sku[0].discount
                            ).toFixed(2)}
                          </span>
                        </div>
                        {/* End product price */}

                        <div className="product-review">
                          <ProductRate rate={item.rate} />
                        </div>
                      </div>
                      {/* End product details */}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
      <hr className="clear" />
      <Pagination
        handler={pageHandler}
        page={page}
        pageRange={pageRange}
        pageSize={pageSize}
      />
    </Fragment>
  );
};

export default GridProducts;
