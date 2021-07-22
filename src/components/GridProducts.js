import { useState } from "react";

const GridProducts = (props) => {
  const [productSort, setProductSort] = useState(1);

  const ReteItem = (props) => {
    if (props.index <= props.rate) {
      return <i className="font-13 fa fa-star"></i>;
    } else {
      return <i className="font-13 fa fa-star-o"></i>;
    }
  };

  const ProductRate = (props) => {
    const rate = [];
    for (let i = 1; i <= 5; i++) {
      rate.push(<ReteItem rate={props.rate} index={i} key={`rateItem${i}`} />);
    }

    return rate;
  };

  const sortHandler = () => {
   // submit request to backend server and retrieve sorted data
  };

  return (
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
            <div className="col-6 col-md-6 col-lg-10 text-center filters-toolbar__item filters-toolbar__item--count d-flex justify-content-end align-items-center">
              <span className="filters-toolbar__product-count">
                Showing: {props.data && props.data.length}
              </span>
            </div>
            <div className="col-6 col-md-6 col-lg-2 text-right">
              <div className="filters-toolbar__item">
                <label htmlFor="SortBy" className="hidden">
                  Sort
                </label>
                <select
                  name="SortBy"
                  id="SortBy"
                  className="filters-toolbar__input filters-toolbar__input--sort"
                  value="2"
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
      <div className="grid-products grid--view-items">
        <div className="row">
          {props.data &&
            props.data.map((item) => {
              const isSoldOut = item.sku.every(function (item, index, array) {
                return item.originalPrice * item.discount === 1;
              });

              const hasDiscount = item.sku.some(function (item, index, array) {
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
                  <div className="product-image">
                    {/* start product image */}
                    <a href="#">
                      {/* image */}
                      <img
                        className="primary blur-up lazyload"
                        data-src={item.largeImgs[0].src}
                        src={item.largeImgs[0].src}
                        alt={item.title}
                        title={item.title}
                      />
                      {/* End image */}
                      {/* Hover image */}
                      <img
                        className="hover blur-up lazyload"
                        data-src={item.largeImgs[0].src.replace(
                          ".jpg",
                          "-1.jpg"
                        )}
                        src={item.largeImgs[0].src.replace(".jpg", "-1.jpg")}
                        alt="image"
                        title="product"
                      />
                      {/* End hover image */}
                      {/* product label */}
                      <div className="product-labels rectangular">
                        {productDiscount}
                        {productNew}
                      </div>
                      {/* End product label */}
                    </a>
                    {/* end product image */}

                    {/* Start product button */}
                    <form className="variants add" action="#" method="post">
                      <button className="btn btn-addto-cart" type="button">
                        Select Options
                      </button>
                    </form>
                    <div className="button-set">
                      <a
                        href="#"
                        title="Quick View"
                        className="quick-view-popup quick-view"
                        data-toggle="modal"
                        data-target="#content_quickview"
                      >
                        <i className="icon anm anm-search-plus-r"></i>
                      </a>
                    </div>
                    {/* end product button */}
                  </div>
                  {/* end product image */}

                  {/*start product details */}
                  <div className="product-details text-center">
                    {/* product name */}
                    <div className="product-name">
                      <a href="#">Edna Dress</a>
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
    </div>
  );
};

export default GridProducts;
