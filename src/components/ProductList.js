import $ from "jquery";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";

import { Fragment, useEffect, useState } from "react";
import { getProducts } from "./product-action";

const ProductList = (props) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productColors, setProductColors] = useState([]);
  const [productSizes, setProductSizes] = useState([]);

  let categoryInit = false;
  const priceMin = 12;
  const priceMax = 300;

  const getDistinctSizeAndColor = (data) => {
    let skus = [];
    for (let i = 0; i < data.products.length; i++) {
      skus = skus.concat(data.products[i].sku);
    }

    const size = [...new Set(skus.map((item) => item.size))];
    const colors = [...new Set(skus.map((item) => item.color))];

    setProductSizes(size);
    setProductColors(colors);
  };

  useEffect(() => {
    document.body.classList.add("template-collection");
    price_slider();
    color_swacthes();

    getCategories();
    getProducts(setProducts).then((items) => {
      setProducts(items);
      getDistinctSizeAndColor(items);

      console.log("items", items);
    });
  }, []);

  const inputOnchange = () => {};

  const getCategories = async () => {
    const response = await fetch(
      "https://localhost:44396/Api/values/GetCategories"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();
    const reqItems = JSON.parse(data.content);
    const loadedItems = reqItems.slice();

    setCategories(loadedItems);
  };

  const categories_level = () => {
    $(".sidebar_categories .sub-level a").on("click", function () {
      console.log("click");
      $(this).toggleClass("active");
      $(this).next(".sublinks").slideToggle("slow");
    });
  };

  const price_slider = () => {
    $("#slider-range").slider({
      range: true,
      min: priceMin,
      max: priceMax,
      values: [0, 100],
      slide: function (event, ui) {
        console.log("ui", ui.values);
        $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
      },
    });

    setPriceInput(
      $("#slider-range").slider("values", 0),
      $("#slider-range").slider("values", 1)
    );
  };

  const setPriceInput = (start, end) => {
    $("#amount").val("$" + start + " - $" + end);
  };

  const priceFilterInputOnchange = (event) => {
    const value = event.target.value;
    if (!value) {
      $("#slider-range").slider("values", [priceMin, priceMax]);
      setPriceInput(priceMin, priceMax);
      return;
    }

    const valueSplit = value.split("-");
    let priceStart = parseInt(valueSplit[0].replace("$", "").trim(), 10);
    let priceEnd = parseInt(valueSplit[1].replace("$", "").trim(), 10);
    priceStart = priceStart < priceMin ? priceMin : priceStart;
    priceEnd = priceEnd > priceMax ? priceMax : priceEnd;

    $("#slider-range").slider("values", [priceStart, priceEnd]);
    setPriceInput(priceStart, priceEnd);
  };

  const color_swacthes = () => {
    $.each($(".swacth-list"), function () {
      var n = $(".swacth-btn");
      n.on("click", function () {
        $(this).parent().find(n).removeClass("checked");
        $(this).addClass("checked");
      });
    });
  };

  const CategoryItem = (props) => {
    useEffect(() => {
      if (!categoryInit) {
        categoryInit = true;
        categories_level();
      }
    }, []);

    const subItems =
      props.item.tags.length !== 0 ? (
        <ul className="sublinks">
          {props.item.tags.map((item) => (
            <CategorySubItem title={item.title} key={item.id} />
          ))}
        </ul>
      ) : null;

    const classes =
      props.item.tags.length !== 0 ? "level1 sub-level" : "level1";

    return (
      <li className={classes}>
        <a href="#" className="site-nav">
          {props.item.title}
        </a>
        {subItems}
      </li>
    );
  };

  const CategorySubItem = (props) => {
    return (
      <li className="level2">
        <a href="#" className="site-nav">
          {props.title}
        </a>
      </li>
    );
  };

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

  return (
    <Fragment>
      {/*Collection Banner*/}
      <div className="collection-header">
        <div className="collection-hero">
          <div className="collection-hero__image">
            <img
              className="blur-up lazyload"
              data-src="assets/images/cat-women2.jpg"
              src="assets/images/cat-women2.jpg"
              alt="Women"
              title="Women"
            />
          </div>
          <div className="collection-hero__title-wrapper">
            <h1 className="collection-hero__title page-width">
              Shop Grid 3 Column
            </h1>
          </div>
        </div>
      </div>
      {/*End Collection Banner*/}

      <div className="container">
        <div className="row">
          {/*Sidebar*/}
          <div className="col-12 col-sm-12 col-md-3 col-lg-3 sidebar filterbar">
            <div className="closeFilter d-block d-md-none d-lg-none">
              <i className="icon icon anm anm-times-l"></i>
            </div>
            <div className="sidebar_tags">
              {/*Categories*/}
              <div className="sidebar_widget categories filter-widget">
                <div className="widget-title">
                  <h2>Categories</h2>
                </div>
                <div className="widget-content">
                  <ul className="sidebar_categories">
                    {categories.map((item, index) => (
                      <CategoryItem item={item} key={index} />
                    ))}
                  </ul>
                </div>
              </div>
              {/*Categories*/}
              {/*Price Filter*/}
              <div className="sidebar_widget filterBox filter-widget">
                <div className="widget-title">
                  <h2>Price</h2>
                </div>
                <form action="#" method="post" className="price-filter">
                  <div
                    id="slider-range"
                    className="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
                  >
                    <div className="ui-slider-range ui-widget-header ui-corner-all"></div>
                    <span
                      className="ui-slider-handle ui-state-default ui-corner-all"
                      tabIndex="0"
                    ></span>
                    <span
                      className="ui-slider-handle ui-state-default ui-corner-all"
                      tabIndex="0"
                    ></span>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <p className="no-margin">
                        <input
                          id="amount"
                          type="text"
                          onBlur={priceFilterInputOnchange}
                          placeholder="$12 - $300"
                        />
                      </p>
                    </div>
                    <div className="col-6 text-right margin-25px-top">
                      <button className="btn btn-secondary btn--small">
                        filter
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              {/*End Price Filter*/}
              {/*Size Swatches*/}
              <div className="sidebar_widget filterBox filter-widget size-swacthes">
                <div className="widget-title">
                  <h2>Size</h2>
                </div>
                <div className="filter-color swacth-list">
                  <ul>
                    {productSizes.map((item, index) => {
                      const colorClasses =
                        index === 0 ? "swacth-btn checked" : "swacth-btn";
                      return (
                        <li key={item}>
                          <span className={colorClasses}>{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {/*End Size Swatches*/}
              {/*Color Swatches*/}
              <div className="sidebar_widget filterBox filter-widget">
                <div className="widget-title">
                  <h2>Color</h2>
                </div>
                <div className="filter-color swacth-list clearfix">
                  {productColors.map((item, index) => {
                    const colorClasses =
                      index === 0
                        ? "swacth-btn " + item.toLowerCase() + " checked"
                        : "swacth-btn " + item.toLowerCase();
                    return <span className={colorClasses} key={item}></span>;
                  })}
                </div>
              </div>
              {/*End Color Swatches*/}

              {/*Popular Products*/}
              <div className="sidebar_widget">
                <div className="widget-title">
                  <h2>Popular Products</h2>
                </div>
                <div className="widget-content">
                  <div className="list list-sidebar-products">
                    <div className="grid">
                      {products.products &&
                        products.products.map((item) => {
                          return (
                            <div className="grid__item" key={item.id}>
                              <div className="mini-list-item">
                                <div className="mini-view_image">
                                  <a className="grid-view-item__link" href="#">
                                    <img
                                      className="grid-view-item__image"
                                      src={item.largeImgs[0].src}
                                      alt={item.title}
                                    />
                                  </a>
                                </div>
                                <div className="details">
                                  <a className="grid-view-item__title" href="#">
                                    {item.title}
                                  </a>
                                  <div className="grid-view-item__meta">
                                    <span className="product-price__price">
                                      <span className="money">
                                        $
                                        {(
                                          item.sku[0].originalPrice *
                                          item.sku[0].discount
                                        ).toFixed(2)}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
              {/*End Popular Products*/}
              {/*Banner*/}
              <div className="sidebar_widget static-banner">
                <img src="assets/images/side-banner-2.jpg" alt="" />
              </div>
              {/*Banner*/}
              {/*Information*/}
              <div className="sidebar_widget">
                <div className="widget-title">
                  <h2>Information</h2>
                </div>
                <div className="widget-content">
                  <p>
                    Use this text to share information about your brand with
                    your customers. Describe a product, share announcements, or
                    welcome customers to your store.
                  </p>
                </div>
              </div>
              {/*end Information*/}
            </div>
          </div>
          {/*End Sidebar*/}
          {/*Main Content*/}
          <div className="col-12 col-sm-12 col-md-9 col-lg-9 main-col">
            <div className="category-description">
              <h3>Category Description</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing.
              </p>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source.
              </p>
            </div>
            <hr />
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
                    <div className="col-4 col-md-4 col-lg-4 filters-toolbar__item collection-view-as d-flex justify-content-start align-items-center">
                      <a
                        href="shop-left-sidebar.html"
                        title="Grid View"
                        className="change-view change-view--active"
                      >
                        <img src="assets/images/grid.jpg" alt="Grid" />
                      </a>
                      <a
                        href="shop-listview.html"
                        title="List View"
                        className="change-view"
                      >
                        <img src="assets/images/list.jpg" alt="List" />
                      </a>
                    </div>
                    <div className="col-4 col-md-4 col-lg-4 text-center filters-toolbar__item filters-toolbar__item--count d-flex justify-content-center align-items-center">
                      <span className="filters-toolbar__product-count">
                        Showing: 22
                      </span>
                    </div>
                    <div className="col-4 col-md-4 col-lg-4 text-right">
                      <div className="filters-toolbar__item">
                        <label htmlFor="SortBy" className="hidden">
                          Sort
                        </label>
                        <select
                          name="SortBy"
                          id="SortBy"
                          className="filters-toolbar__input filters-toolbar__input--sort"
                          value="title-ascending"
                          onChange={inputOnchange}
                        >
                          <option value="title-ascending">Sort</option>
                          <option>Best Selling</option>
                          <option>Alphabetically, A-Z</option>
                          <option>Alphabetically, Z-A</option>
                          <option>Price, low to high</option>
                          <option>Price, high to low</option>
                          <option>Date, new to old</option>
                          <option>Date, old to new</option>
                        </select>
                        <input
                          className="collection-header__default-sort"
                          type="hidden"
                          value="manual"
                          onChange={inputOnchange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*End Toolbar*/}

              <div className="grid-products grid--view-items">
                <div className="row">
                  {products.products &&
                    products.products.map((item) => {
                      const isSoldOut = item.sku.every(function (
                        item,
                        index,
                        array
                      ) {
                        return item.originalPrice * item.discount === 0;
                      });

                      const hasDiscount = item.sku.some(function (
                        item,
                        index,
                        array
                      ) {
                        return item.discount != 0;
                      });

                      const hasNew = item.sku.some(function (
                        item,
                        index,
                        array
                      ) {
                        const oneDay = 1000 * 60 * 60 * 24;
                        const diffInTime =
                          new Date().getTime() -
                          new Date(item.startDate).getTime();
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
                                src={item.largeImgs[0].src.replace(
                                  ".jpg",
                                  "-1.jpg"
                                )}
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
                            <form
                              className="variants add"
                              action="#"
                              method="post"
                            >
                              <button
                                className="btn btn-addto-cart"
                                type="button"
                              >
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
                                  item.sku[0].originalPrice *
                                  item.sku[0].discount
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
            <hr className="clear" />
            <div className="pagination">
              <ul>
                <li className="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li className="next">
                  <a href="#">
                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/*End Main Content*/}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
