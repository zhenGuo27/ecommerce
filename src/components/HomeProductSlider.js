import $ from "jquery";
import { useEffect } from "react";
import slick from "slick-carousel";

import product_H4 from "../images/product-images/home7-product4.jpg";
import product_H5 from "../images/product-images/home7-product5.jpg";
import product4 from "../images/product-images/product-image4.jpg";
import product4_1 from "../images/product-images/product-image4-1.jpg";
import product5 from "../images/product-images/product-image5.jpg";
import product5_1 from "../images/product-images/product-image5-1.jpg";
import product7 from "../images/product-images/product-image7.jpg";
import product7_1 from "../images/product-images/product-image7-1.jpg";
import product24 from "../images/product-images/product-image24.jpg";
import product24_1 from "../images/product-images/product-image24-1.jpg";
import product33 from "../images/product-images/product-image33.jpg";
import product33_1 from "../images/product-images/product-image33-1.jpg";

const HomeProductSlider = () => {
  useEffect(() => {
    setSlider();
  }, []);

  const inputOnChangeHandler = () => {};

  const setSlider = () => {
    $(".productSlider").slick({
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <div className="section-header text-center">
              <h2 className="h2">Shop these looks</h2>
              <p>Shop from hundreds of collections for a fashionable look.</p>
            </div>
            <div className="productSlider grid-products grid-products-hover-gry">
              <div className="col-12 item">
                {/* start product image */}
                <div className="product-image">
                  {/* start product image */}
                  <a
                    href="product-layout-1.html"
                    className="grid-view-item__link"
                  >
                    {/* image */}
                    <img
                      className="primary "
                      data-src={product7}
                      src={product7}
                      alt="image"
                      title="product"
                    />
                    {/* End image */}
                    {/* Hover image */}
                    <img
                      className="hover "
                      data-src={product7_1}
                      src={product7_1}
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
                    onClick={inputOnChangeHandler}
                    method="post"
                  >
                    <button
                      className="btn btn-addto-cart"
                      type="button"
                      tabIndex="0"
                    >
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
                        href="wishlist.html"
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
                    <a href="product-layout-1.html">Block Button Up</a>
                  </div>
                  {/* End product name */}
                  {/* product price */}
                  <div className="product-price">
                    <span className="price">$600.00</span>
                  </div>
                  {/* End product price */}
                </div>
                {/* End product details */}
              </div>
              <div className="col-12 item">
                {/* start product image */}
                <div className="product-image">
                  {/* start product image */}
                  <a
                    href="product-layout-1.html"
                    className="grid-view-item__link"
                  >
                    {/* image */}
                    <img
                      className="primary "
                      data-src={product24}
                      src={product24}
                      alt="image"
                      title="product"
                    />
                    {/* End image */}
                    {/* Hover image */}
                    <img
                      className="hover "
                      data-src={product24_1}
                      src={product24_1}
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
                    onClick={inputOnChangeHandler}
                    method="post"
                  >
                    <button
                      className="btn btn-addto-cart"
                      type="button"
                      tabIndex="0"
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
                    <div className="wishlist-btn">
                      <a
                        className="wishlist add-to-wishlist"
                        href="wishlist.html"
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
                    <a href="product-layout-1.html">Cena Skirt</a>
                  </div>
                  {/* End product name */}
                  {/* product price */}
                  <div className="product-price">
                    <span className="price">$748.00</span>
                  </div>
                  {/* End product price */}
                </div>
                {/* End product details */}
              </div>
              <div className="col-12 item">
                {/* start product image */}
                <div className="product-image">
                  {/* start product image */}
                  <a
                    href="product-layout-1.html"
                    className="grid-view-item__link"
                  >
                    {/* image */}
                    <img
                      className="primary "
                      data-src={product33}
                      src={product33}
                      alt="image"
                      title="product"
                    />
                    {/* End image */}
                    {/* Hover image */}
                    <img
                      className="hover "
                      data-src={product33_1}
                      src={product33_1}
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
                    onClick={inputOnChangeHandler}
                    method="post"
                  >
                    <button
                      className="btn btn-addto-cart"
                      type="button"
                      tabIndex="0"
                    >
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
                        href="wishlist.html"
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
                    <a href="product-layout-1.html">Balda Button Pant</a>
                  </div>
                  {/* End product name */}
                  {/* product price */}
                  <div className="product-price">
                    <span className="price">$350.00</span>
                  </div>
                  {/* End product price */}
                </div>
                {/* End product details */}
              </div>
              <div className="col-12 item">
                {/* start product image */}
                <div className="product-image">
                  {/* start product image */}
                  <a
                    href="product-layout-1.html"
                    className="grid-view-item__link"
                  >
                    {/* image */}
                    <img
                      className="primary "
                      data-src={product_H4}
                      src={product_H4}
                      alt="image"
                      title="product"
                    />
                    {/* End image */}
                    {/* Hover image */}
                    <img
                      className="hover "
                      data-src={product4_1}
                      src={product4_1}
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
                    onClick={inputOnChangeHandler}
                    method="post"
                  >
                    <button
                      className="btn btn-addto-cart"
                      type="button"
                      tabIndex="0"
                    >
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
                        href="wishlist.html"
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
                    <a href="product-layout-1.html">Cape Dress</a>
                  </div>
                  {/* End product name */}
                  {/* product price */}
                  <div className="product-price">
                    <span className="old-price">$900.00</span>
                    <span className="price">$788.00</span>
                  </div>
                  {/* End product price */}
                </div>
                {/* End product details */}
              </div>
              <div className="col-12 item">
                {/* start product image */}
                <div className="product-image">
                  {/* start product image */}
                  <a
                    href="product-layout-1.html"
                    className="grid-view-item__link"
                  >
                    {/* image */}
                    <img
                      className="primary "
                      data-src={product_H5}
                      src={product_H5}
                      alt="image"
                      title="product"
                    />
                    {/* End image */}
                    {/* Hover image */}
                    <img
                      className="hover "
                      data-src={product5_1}
                      src={product5_1}
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
                    onClick={inputOnChangeHandler}
                    method="post"
                  >
                    <button
                      className="btn btn-addto-cart"
                      type="button"
                      tabIndex="0"
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
                    <div className="wishlist-btn">
                      <a
                        className="wishlist add-to-wishlist"
                        href="wishlist.html"
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
                    <a href="product-layout-1.html">Paper Dress</a>
                  </div>
                  {/* End product name */}
                  {/* product price */}
                  <div className="product-price">
                    <span className="price">$450.00</span>
                  </div>
                  {/* End product price */}
                </div>
                {/* End product details */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProductSlider;
