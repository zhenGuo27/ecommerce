import $ from "jquery";
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.min.css';

import { Fragment, useEffect, useState } from "react";
import { getProducts } from "./product-action";

const ProductList = (props) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  let categoryInit = false;
  const priceMin = 12;
  const priceMax = 300;

  useEffect(() => {
    document.body.classList.add("template-collection");
    price_slider();
    color_swacthes();

    getCategories();
    getProducts(setProducts).then((items) => {
      setProducts(items);
    });    
  }, []);

  const inputOnchange = () => {};

  const getCategories = async () => {
    const response = await fetch("https://localhost:44396/Api/values/GetCategories");

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
      }
    });

    setPriceInput($("#slider-range").slider("values", 0), $("#slider-range").slider("values", 1));
  };

  const setPriceInput = (start, end) => {
    $("#amount").val("$" + start + " - $" + end);
  };

  const priceFilterInputOnchange = (event) => {
    const value = event.target.value;
    if(!value) {
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

  const color_swacthes =()=> {
    $.each($(".swacth-list"), function () {
      var n = $(".swacth-btn");
      n.on("click", function () {
        $(this).parent().find(n).removeClass("checked");
        $(this).addClass("checked");
      });
    });
  }

  const CategoryItem = (props)=> {
    useEffect(() => {
      if (!categoryInit) {
        categoryInit = true;
        categories_level();
      }
    }, []);

    const subItems = (props.item.tags.length !==0) ? <ul className="sublinks">
          {
            props.item.tags.map((item)=> 
              <CategorySubItem title={item.title}/>           
            )
          }
    </ul> : null;

    const classes = (props.item.tags.length !==0)?"level1 sub-level": "level1";

    return (
      <li className={classes}>
        <a href="#" className="site-nav">
          {props.item.title}
        </a>
        {subItems}       
      </li>
    )
  };

  const CategorySubItem =(props)=> {
    return (
      <li className="level2">
      <a href="#" className="site-nav">
        {props.title}
      </a>
    </li>
    )
  };

  ///const productColors = [...new Set(products.map(item => item..color))];

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
                    {
                      categories.map((item, index)=> <CategoryItem item={item} key={index}/>)
                    }                              
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
                        <input id="amount" type="text" onBlur={priceFilterInputOnchange} placeholder="$12 - $300"/>
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
                    <li>
                      <span className="swacth-btn checked">X</span>
                    </li>
                    <li>
                      <span className="swacth-btn">XL</span>
                    </li>
                    <li>
                      <span className="swacth-btn">XLL</span>
                    </li>
                    <li>
                      <span className="swacth-btn">M</span>
                    </li>
                    <li>
                      <span className="swacth-btn">L</span>
                    </li>
                    <li>
                      <span className="swacth-btn">S</span>
                    </li>
                    <li>
                      <span className="swacth-btn">XXXL</span>
                    </li>
                    <li>
                      <span className="swacth-btn">XXL</span>
                    </li>
                    <li>
                      <span className="swacth-btn">XS</span>
                    </li>
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
                  <span className="swacth-btn black"></span>
                  <span className="swacth-btn white checked"></span>
                  <span className="swacth-btn red"></span>
                  <span className="swacth-btn blue"></span>
                  <span className="swacth-btn pink"></span>
                  <span className="swacth-btn gray"></span>
                  <span className="swacth-btn green"></span>
                  <span className="swacth-btn orange"></span>
                  <span className="swacth-btn yellow"></span>
                  <span className="swacth-btn blueviolet"></span>
                  <span className="swacth-btn brown"></span>
                  <span className="swacth-btn darkGoldenRod"></span>
                  <span className="swacth-btn darkGreen"></span>
                  <span className="swacth-btn darkRed"></span>
                  <span className="swacth-btn dimGrey"></span>
                  <span className="swacth-btn khaki"></span>
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
                      <div className="grid__item">
                        <div className="mini-list-item">
                          <div className="mini-view_image">
                            <a className="grid-view-item__link" href="#">
                              <img
                                className="grid-view-item__image"
                                src="assets/images/product-images/mini-product-img.jpg"
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="details">
                            {" "}
                            <a className="grid-view-item__title" href="#">
                              Cena Skirt
                            </a>
                            <div className="grid-view-item__meta">
                              <span className="product-price__price">
                                <span className="money">$173.60</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid__item">
                        <div className="mini-list-item">
                          <div className="mini-view_image">
                            {" "}
                            <a className="grid-view-item__link" href="#">
                              <img
                                className="grid-view-item__image"
                                src="assets/images/product-images/mini-product-img1.jpg"
                                alt=""
                              />
                            </a>{" "}
                          </div>
                          <div className="details">
                            {" "}
                            <a className="grid-view-item__title" href="#">
                              Block Button Up
                            </a>
                            <div className="grid-view-item__meta">
                              <span className="product-price__price">
                                <span className="money">$378.00</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid__item">
                        <div className="mini-list-item">
                          <div className="mini-view_image">
                            {" "}
                            <a className="grid-view-item__link" href="#">
                              <img
                                className="grid-view-item__image"
                                src="assets/images/product-images/mini-product-img2.jpg"
                                alt=""
                              />
                            </a>{" "}
                          </div>
                          <div className="details">
                            {" "}
                            <a className="grid-view-item__title" href="#">
                              Balda Button Pant
                            </a>
                            <div className="grid-view-item__meta">
                              <span className="product-price__price">
                                <span className="money">$278.60</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid__item">
                        <div className="mini-list-item">
                          <div className="mini-view_image">
                            {" "}
                            <a className="grid-view-item__link" href="#">
                              <img
                                className="grid-view-item__image"
                                src="assets/images/product-images/mini-product-img3.jpg"
                                alt=""
                              />
                            </a>{" "}
                          </div>
                          <div className="details">
                            {" "}
                            <a className="grid-view-item__title" href="#">
                              Border Dress in Black/Silver
                            </a>
                            <div className="grid-view-item__meta">
                              <span className="product-price__price">
                                <span className="money">$228.00</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
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
                {" "}
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
                          <option value="title-ascending">
                            Sort
                          </option>
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
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image1.jpg"
                          src="assets/images/product-images/product-image1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image1-1.jpg"
                          src="assets/images/product-images/product-image1-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                        {/* product label */}
                        <div className="product-labels rectangular">
                          <span className="lbl on-sale">-16%</span>{" "}
                          <span className="lbl pr-label1">new</span>
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
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
                        <span className="old-price">$500.00</span>
                        <span className="price">$600.00</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image2.jpg"
                          src="assets/images/product-images/product-image2.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image2-1.jpg"
                          src="assets/images/product-images/product-image2-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        method="post"
                      >
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">Elastic Waist Dress</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$748.00</span>
                      </div>
                      {/* End product price */}
                      <div className="product-review">
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image3.jpg"
                          src="assets/images/product-images/product-image3.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image3-1.jpg"
                          src="assets/images/product-images/product-image3-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                        {/* product label */}
                        <div className="product-labels rectangular">
                          <span className="lbl pr-label2">Hot</span>
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
                        <button className="btn btn-addto-cart" type="button">
                          Add To Cart
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">3/4 Sleeve Kimono Dress</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$550.00</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star-o"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image4.jpg"
                          src="assets/images/product-images/product-image4.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image4-1.jpg"
                          src="assets/images/product-images/product-image4-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                        {/* product label */}
                        <div className="product-labels">
                          <span className="lbl on-sale">Sale</span>
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">Cape Dress</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="old-price">$900.00</span>
                        <span className="price">$788.00</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image5.jpg"
                          src="assets/images/product-images/product-image5.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image5-1.jpg"
                          src="assets/images/product-images/product-image5-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                        {/* product label */}
                        <div className="product-labels">
                          <span className="lbl on-sale">Sale</span>
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
                        <button className="btn btn-addto-cart" type="button">
                          Add To Cart
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">Paper Dress</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$550.00</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image17.jpg"
                          src="assets/images/product-images/product-image17.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image17-1.jpg"
                          src="assets/images/product-images/product-image17-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                        {/* product label */}
                        <div className="product-labels">
                          <span className="lbl on-sale">Sale</span>
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
                        <button className="btn btn-addto-cart" type="button">
                          Add To Cart
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">Buttercup Dress</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$420.00</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image18.jpg"
                          src="assets/images/product-images/product-image18.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image18-1.jpg"
                          src="assets/images/product-images/product-image18-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        
                        method="post"
                      >
                        <button className="btn btn-addto-cart" type="button">
                          Add To Cart
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">Lima Shirt</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$698.00</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image19.jpg"
                          src="assets/images/product-images/product-image19.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image19-1.jpg"
                          src="assets/images/product-images/product-image19-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        
                        method="post"
                      >
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">Romary Dress</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$348.60</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image20.jpg"
                          src="assets/images/product-images/product-image20.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image20-1.jpg"
                          src="assets/images/product-images/product-image20-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                        {/* product label */}
                        <div className="product-labels">
                          <span className="lbl pr-label3">Popular</span>
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
                        <button className="btn btn-addto-cart" type="button">
                          Add to cart
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">Floral Sleeveless Dress</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$380.00</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image21.jpg"
                          src="assets/images/product-images/product-image21.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image21-1.jpg"
                          src="assets/images/product-images/product-image21-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        
                        method="post"
                      >
                        <button className="btn btn-addto-cart" type="button">
                          Add to cart
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">Button Up Dress</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$400.00</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image22.jpg"
                          src="assets/images/product-images/product-image22.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image22-1.jpg"
                          src="assets/images/product-images/product-image22-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        
                        method="post"
                      >
                        <button className="btn btn-addto-cart" type="button">
                          Add to cart
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">Lexie Shirt</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$200.00</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image23.jpg"
                          src="assets/images/product-images/product-image23.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image23-1.jpg"
                          src="assets/images/product-images/product-image23-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        
                        method="post"
                      >
                        <button className="btn btn-addto-cart" type="button">
                          Add to cart
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">One Shoulder Dress in Navy</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$1,048.60</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                        <i className="font-13 fa fa-star"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image24.jpg"
                          src="assets/images/product-images/product-image24.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image24-1.jpg"
                          src="assets/images/product-images/product-image24-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        
                        method="post"
                      >
                        <button className="btn btn-addto-cart" type="button">
                          Add to cart
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">Triangle Sleeveless Dress in Multi</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$684.60</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image25.jpg"
                          src="assets/images/product-images/product-image25.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image25-1.jpg"
                          src="assets/images/product-images/product-image25-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        
                        method="post"
                      >
                        <button className="btn btn-addto-cart" type="button">
                          Add to cart
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">ACB Top</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$280.00</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image26.jpg"
                          src="assets/images/product-images/product-image26.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image26-1.jpg"
                          src="assets/images/product-images/product-image26-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        
                        method="post"
                      >
                        <button className="btn btn-addto-cart" type="button">
                          Add to cart
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">A-Line Jacket</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$698.60</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item grid-view-item--sold-out">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="grid-view-item__image primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image27.jpg"
                          src="assets/images/product-images/product-image27.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="grid-view-item__image hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image27-1.jpg"
                          src="assets/images/product-images/product-image27-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                        <span className="sold-out">
                          <span>Sold out</span>
                        </span>
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        
                        method="post"
                      >
                        <button className="btn btn-addto-cart" type="button">
                          Add to cart
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">Camelia Reversible Jacket in Navy/Blue</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$488.00</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image28.jpg"
                          src="assets/images/product-images/product-image28.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image28-1.jpg"
                          src="assets/images/product-images/product-image28-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        
                        method="post"
                      >
                        <button className="btn btn-addto-cart" type="button">
                          Add to cart
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">Wrinkled Tux Shirt in Navy</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$158.00</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image29.jpg"
                          src="assets/images/product-images/product-image29.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image29-1.jpg"
                          src="assets/images/product-images/product-image29-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        
                        method="post"
                      >
                        <button className="btn btn-addto-cart" type="button">
                          Add to cart
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">A-Line Mini Dress in Blue</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$348.00</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image30.jpg"
                          src="assets/images/product-images/product-image30.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image30-1.jpg"
                          src="assets/images/product-images/product-image30-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        
                        method="post"
                      >
                        <button className="btn btn-addto-cart" type="button">
                          Add to cart
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">Asymmetric Dress in Black</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$578.00</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-4 col-lg-4 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a href="#">
                        {/* image */}
                        <img
                          className="primary blur-up lazyload"
                          data-src="assets/images/product-images/product-image31.jpg"
                          src="assets/images/product-images/product-image31.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover blur-up lazyload"
                          data-src="assets/images/product-images/product-image31-1.jpg"
                          src="assets/images/product-images/product-image31-1.jpg"
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        
                        method="post"
                      >
                        <button className="btn btn-addto-cart" type="button">
                          Add to cart
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
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">Babydoll Bow Dress</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$313.60</span>
                      </div>
                      {/* End product price */}

                      <div className="product-review">
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                        <i className="font-13 fa fa-star-o"></i>
                      </div>
                    </div>
                    {/* End product details */}
                  </div>
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
