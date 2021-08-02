import $ from "jquery";
import * as PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import { Fragment, useEffect, useState } from "react";
import { getProductById } from "./product-action";
import ProductRate from "./ProductRate";
import ColorItems from "./ColorItems";
import SizeItems from "./SizeItems";
window.jQuery = window.$ = $;
require("ez-plus");

const Product = (props) => {
  const [productData, setProduct] = useState({});
  const [currentSku, setCurrentSku] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(1);

  useEffect(() => {
    document.body.classList.add("template-product");

    getProductById(props.id).then((item) => {
      setProduct(item);
      setCurrentSku(item.sku[0]);
    });

    product_thumb();
    product_slider_ppage();
    product_zoom();
    setTabs();
    imgPopup();
  }, []);

  useEffect(() => {
    if (Object.keys(productData).length !== 0) {
      setSelectedColor(productData.sku[0].color);
      setSelectedSize(productData.sku[0].size);
    }
  }, [productData]);

  const orderQuantityChangeHandler = (event) => {
    const quantity =
      currentSku.stock >= event.target.value
        ? event.target.value
        : currentSku.stock;
    setOrderQuantity(quantity);
  };

  const increaseQuantity = () => {
    let updatedQuantiy = orderQuantity;
    updatedQuantiy = (currentSku.stock > updatedQuantiy) ? updatedQuantiy + 1 : updatedQuantiy;
    setOrderQuantity(updatedQuantiy);
  };

  const decreaseQuantity = () => {
    let updatedQuantiy = orderQuantity;
    updatedQuantiy = (updatedQuantiy !== 1) ? updatedQuantiy - 1 : updatedQuantiy;
    setOrderQuantity(updatedQuantiy);
  };

  const colorChangeHandler = (color) => {
    setSelectedColor(color);
  };

  const sizeChangeHandler = (size) => {
    setSelectedSize(size);
  };

  const imgPopup = () => {
    var $pswp = $(".pswp")[0],
      image = [],
      getItems = function () {
        var items = [];
        $(".lightboximages a").each(function () {
          var $href = $(this).attr("href"),
            $size = $(this).data("size").split("x"),
            item = {
              src: $href,
              w: $size[0],
              h: $size[1],
            };
          items.push(item);
        });
        return items;
      };
    var items = getItems();

    $.each(items, function (index, value) {
      image[index] = new Image();
      image[index].src = value["src"];
    });
    $(".prlightbox").on("click", function (event) {
      event.preventDefault();

      var $index = $(".active-thumb").parent().attr("data-slick-index");
      $index++;
      $index = $index - 1;

      var options = {
        index: $index,
        bgOpacity: 0.9,
        showHideOpacity: true,
        shareEl: false
      };
      var lightBox = new PhotoSwipe(
        $pswp,
        PhotoSwipeUI_Default,
        items,
        options
      );
      lightBox.init();
    });
  };

  const product_thumb = () => {
    $(".product-dec-slider-2").slick({
      infinite: true,
      slidesToShow: 5,
      vertical: true,
      slidesToScroll: 1,
      centerPadding: "60px",
    });
  };

  const setTabs = () => {
    $(".tab-content").hide();
    $(".tab-content:first").show();
    /* if in tab mode */
    $(".product-tabs li").on("click", function () {
      $(".tab-content").hide();
      var activeTab = $(this).attr("rel");
      $("#" + activeTab).fadeIn();

      $(".product-tabs li").removeClass("active");
      $(this).addClass("active");

      $(this).fadeIn();
      if ($(window).width() < 767) {
        var tabposition = $(this).offset();
        $("html, body").animate({ scrollTop: tabposition.top }, 700);
      }
    });

    $(".product-tabs li:first-child").addClass("active");
    $(".tab-container h3:first-child + .tab-content").show();

    /* if in drawer mode */
    $(".acor-ttl").on("click", function () {
      $(".tab-content").hide();
      var activeTab = $(this).attr("rel");
      $("#" + activeTab).fadeIn();

      $(".acor-ttl").removeClass("active");
      $(this).addClass("active");
    });

    $(".reviewLink").on("click", function (e) {
      e.preventDefault();
      $(".product-tabs li").removeClass("active");
      $(".reviewtab").addClass("active");
      var tab = $(this).attr("href");
      $(".tab-content").not(tab).css("display", "none");
      $(tab).fadeIn();
      var tabposition = $("#tab2").offset();
      if ($(window).width() < 767) {
        $("html, body").animate({ scrollTop: tabposition.top - 50 }, 700);
      } else {
        $("html, body").animate({ scrollTop: tabposition.top - 80 }, 700);
      }
    });
  };

  const product_slider_ppage = () => {
    $(".productPageSlider").slick({
      dots: false,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 680,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 380,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  };

  const product_zoom = () => {
    $(".zoompro").ezPlus({
      gallery: "gallery",
      galleryActiveClass: "active",
      zoomWindowWidth: 300,
      zoomWindowHeight: 100,
      scrollZoom: false,
      zoomType: "inner",
      cursor: "crosshair",
    });
  };

  let actionHtml = null;
  if (currentSku.stock != 0) {
    actionHtml = (
      <div className="product-action clearfix">
        <div className="product-form__item--quantity">
          <div className="wrapQtyBtn">
            <div className="qtyField">
              <a className="qtyBtn minus" onClick={decreaseQuantity}>
                <i className="fa anm anm-minus-r" aria-hidden="true"></i>
              </a>
              <input
                type="text"
                id="Quantity"
                name="quantity"
                value={orderQuantity}
                onChange={orderQuantityChangeHandler}
                className="product-form__input qty"
              />
              <a className="qtyBtn plus" onClick={increaseQuantity}>
                <i className="fa anm anm-plus-r" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="product-form__item--submit">
          <button
            type="button"
            name="add"
            className="btn product-form__cart-submit"
          >
            <span>Add to cart</span>
          </button>
        </div>
        <div className="shopify-payment-button" data-shopify="payment-button">
          <button
            type="button"
            className="shopify-payment-button__button shopify-payment-button__button--unbranded"
          >
            Buy it now
          </button>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div id="MainContent" className="main-content" role="main">
        {/*Breadcrumb*/}
        <div className="bredcrumbWrap">
          <div className="container breadcrumbs">
            <a href="index.html" title="Back to the home page">
              Home
            </a>
            <span aria-hidden="true">›</span>
            <span>{productData.title}</span>
          </div>
        </div>
        {/*End Breadcrumb*/}

        <div
          id="ProductSection-product-template"
          className="product-template__container prstyle1 container"
        >
          {/*product-single*/}
          <div className="product-single">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="product-details-img">
                  <div className="product-thumb">
                    <div
                      id="gallery"
                      className="product-dec-slider-2 product-tab-left"
                    >
                      <a
                        data-image="assets/images/product-detail-page/camelia-reversible-big1.jpg"
                        data-zoom-image="assets/images/product-detail-page/camelia-reversible-big1.jpg"
                        className="slick-slide slick-cloned"
                        data-slick-index="-4"
                        aria-hidden="true"
                        tabIndex="-1"
                      >
                        <img
                          className="blur-up lazyload"
                          data-src="assets/images/product-detail-page/camelia-reversible0.jpg"
                          src="assets/images/product-detail-page/camelia-reversible0.jpg"
                          alt=""
                        />
                      </a>
                      <a
                        data-image="assets/images/product-detail-page/camelia-reversible-big2.jpg"
                        data-zoom-image="assets/images/product-detail-page/camelia-reversible-big2.jpg"
                        className="slick-slide slick-cloned"
                        data-slick-index="-3"
                        aria-hidden="true"
                        tabIndex="-1"
                      >
                        <img
                          className="blur-up lazyload"
                          data-src="assets/images/product-detail-page/camelia-reversible.jpg"
                          src="assets/images/product-detail-page/camelia-reversible.jpg"
                          alt=""
                        />
                      </a>
                      <a
                        data-image="assets/images/product-detail-page/camelia-reversible-big3.jpg"
                        data-zoom-image="assets/images/product-detail-page/camelia-reversible-big3.jpg"
                        className="slick-slide slick-cloned"
                        data-slick-index="-2"
                        aria-hidden="true"
                        tabIndex="-1"
                      >
                        <img
                          className="blur-up lazyload"
                          data-src="assets/images/product-detail-page/camelia-reversible6.jpg"
                          src="assets/images/product-detail-page/camelia-reversible6.jpg"
                          alt=""
                        />
                      </a>
                      <a
                        data-image="assets/images/product-detail-page/camelia-reversible7-big.jpg"
                        data-zoom-image="assets/images/product-detail-page/camelia-reversible7-big.jpg"
                        className="slick-slide slick-cloned"
                        data-slick-index="-1"
                        aria-hidden="true"
                        tabIndex="-1"
                      >
                        <img
                          className="blur-up lazyload"
                          data-src="assets/images/product-detail-page/camelia-reversible7.jpg"
                          src="assets/images/product-detail-page/camelia-reversible7.jpg"
                          alt=""
                        />
                      </a>
                      <a
                        data-image="assets/images/product-detail-page/camelia-reversible-big4.jpg"
                        data-zoom-image="assets/images/product-detail-page/camelia-reversible-big4.jpg"
                        className="slick-slide slick-cloned"
                        data-slick-index="0"
                        aria-hidden="true"
                        tabIndex="-1"
                      >
                        <img
                          className="blur-up lazyload"
                          data-src="assets/images/product-detail-page/camelia-reversible8.jpg"
                          src="assets/images/product-detail-page/camelia-reversible8.jpg"
                          alt=""
                        />
                      </a>
                      <a
                        data-image="assets/images/product-detail-page/camelia-reversible-big5.jpg"
                        data-zoom-image="assets/images/product-detail-page/camelia-reversible-big5.jpg"
                        className="slick-slide slick-cloned"
                        data-slick-index="1"
                        aria-hidden="true"
                        tabIndex="-1"
                      >
                        <img
                          className="blur-up lazyload"
                          data-src="assets/images/product-detail-page/camelia-reversible9.jpg"
                          src="assets/images/product-detail-page/camelia-reversible9.jpg"
                          alt=""
                        />
                      </a>
                      <a
                        data-image="assets/images/product-detail-page/camelia-reversible-big6.jpg"
                        data-zoom-image="assets/images/product-detail-page/camelia-reversible-big6.jpg"
                        className="slick-slide slick-cloned"
                        data-slick-index="2"
                        aria-hidden="true"
                        tabIndex="-1"
                      >
                        <img
                          className="blur-up lazyload"
                          data-src="assets/images/product-detail-page/camelia-reversible1.jpg"
                          src="assets/images/product-detail-page/camelia-reversible1.jpg"
                          alt=""
                        />
                      </a>
                      <a
                        data-image="assets/images/product-detail-page/camelia-reversible-big7.jpg"
                        data-zoom-image="assets/images/product-detail-page/camelia-reversible-big7.jpg"
                        className="slick-slide slick-cloned"
                        data-slick-index="3"
                        aria-hidden="true"
                        tabIndex="-1"
                      >
                        <img
                          className="blur-up lazyload"
                          data-src="assets/images/product-detail-page/camelia-reversible2.jpg"
                          src="assets/images/product-detail-page/camelia-reversible2.jpg"
                          alt=""
                        />
                      </a>
                      <a
                        data-image="assets/images/product-detail-page/camelia-reversible-big8.jpg"
                        data-zoom-image="assets/images/product-detail-page/camelia-reversible-big8.jpg"
                        className="slick-slide slick-cloned"
                        data-slick-index="4"
                        aria-hidden="true"
                        tabIndex="-1"
                      >
                        <img
                          className="blur-up lazyload"
                          data-src="assets/images/product-detail-page/camelia-reversible3.jpg"
                          src="assets/images/product-detail-page/camelia-reversible3.jpg"
                          alt=""
                        />
                      </a>
                      <a
                        data-image="assets/images/product-detail-page/camelia-reversible-big9.jpg"
                        data-zoom-image="assets/images/product-detail-page/camelia-reversible-big9.jpg"
                        className="slick-slide slick-cloned"
                        data-slick-index="5"
                        aria-hidden="true"
                        tabIndex="-1"
                      >
                        <img
                          className="blur-up lazyload"
                          data-src="assets/images/product-detail-page/camelia-reversible4.jpg"
                          src="assets/images/product-detail-page/camelia-reversible4.jpg"
                          alt=""
                        />
                      </a>
                      <a
                        data-image="assets/images/product-detail-page/camelia-reversible-big10.jpg"
                        data-zoom-image="assets/images/product-detail-page/camelia-reversible-big10.jpg"
                        className="slick-slide slick-cloned"
                        data-slick-index="6"
                        aria-hidden="true"
                        tabIndex="-1"
                      >
                        <img
                          className="blur-up lazyload"
                          data-src="assets/images/product-detail-page/camelia-reversible5.jpg"
                          src="assets/images/product-detail-page/camelia-reversible5.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div className="zoompro-wrap product-zoom-right pl-20">
                    <div className="zoompro-span">
                      <img
                        className="blur-up lazyload zoompro"
                        data-zoom-image="assets/images/product-detail-page/camelia-reversible-big1.jpg"
                        alt=""
                        src="assets/images/product-detail-page/camelia-reversible-big1.jpg"
                      />
                    </div>
                    <div className="product-labels">
                      <span className="lbl on-sale">Sale</span>
                      <span className="lbl pr-label1">new</span>
                    </div>
                    <div className="product-buttons">
                      <a className="btn prlightbox" title="Zoom">
                        <i
                          className="icon anm anm-expand-l-arrows"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </div>
                  </div>
                  <div className="lightboximages">
                    <a
                      href="assets/images/product-detail-page/camelia-reversible-big1.jpg"
                      data-size="1462x2048"
                    ></a>
                    <a
                      href="assets/images/product-detail-page/camelia-reversible-big2.jpg"
                      data-size="1462x2048"
                    ></a>
                    <a
                      href="assets/images/product-detail-page/camelia-reversible-big3.jpg"
                      data-size="1462x2048"
                    ></a>
                    <a
                      href="assets/images/product-detail-page/camelia-reversible7-big.jpg"
                      data-size="1462x2048"
                    ></a>
                    <a
                      href="assets/images/product-detail-page/camelia-reversible-big4.jpg"
                      data-size="1462x2048"
                    ></a>
                    <a
                      href="assets/images/product-detail-page/camelia-reversible-big5.jpg"
                      data-size="1462x2048"
                    ></a>
                    <a
                      href="assets/images/product-detail-page/camelia-reversible-big6.jpg"
                      data-size="731x1024"
                    ></a>
                    <a
                      href="assets/images/product-detail-page/camelia-reversible-big7.jpg"
                      data-size="731x1024"
                    ></a>
                    <a
                      href="assets/images/product-detail-page/camelia-reversible-big8.jpg"
                      data-size="731x1024"
                    ></a>
                    <a
                      href="assets/images/product-detail-page/camelia-reversible-big9.jpg"
                      data-size="731x1024"
                    ></a>
                    <a
                      href="assets/images/product-detail-page/camelia-reversible-big10.jpg"
                      data-size="731x1024"
                    ></a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="product-single__meta">
                  <h1 className="product-single__title">
                    {productData.title}
                  </h1>
                  <div className="prInfoRow">
                    <div className="product-stock">
                      {currentSku.stock!==0 && <span className="instock ">In Stock</span>}
                      {currentSku.stock === 0 && <span className="outstock">Unavailable</span>}
                    </div>
                    <div className="product-sku">
                      SKU: <span className="variant-sku">{currentSku.id}</span>
                    </div>
                    <div className="product-review">
                      <a className="reviewLink">
                        <ProductRate rate={productData.rate} />
                      </a>
                    </div>
                  </div>
                  <p className="product-single__price product-single__price-product-template">
                    <span className="visually-hidden">Regular price</span>
                    <s id="ComparePrice-product-template">
                      <span className="money">${currentSku.originalPrice}</span>
                    </s>
                    <span className="product-price__price product-price__price-product-template product-price__sale product-price__sale--single">
                      <span id="ProductPrice-product-template">
                        <span className="money">${currentSku.price}</span>
                      </span>
                    </span>
                  </p>
                </div>
                <div className="product-single__description rte">
                  {productData.desc}
                </div>
                <div id="quantity_message">
                <span className="items">{currentSku.stock}</span> left in stock.
                </div>
                <form
                  method="post"
                  action="http://annimexweb.com/cart/add"
                  id="product_form_10508262282"
                  acceptCharset="UTF-8"
                  className="product-form product-form-product-template hidedropdown"
                  encType="multipart/form-data"
                >
                  <div
                    className="swatch clearfix swatch-0 option1"
                    data-option-index="0"
                  >
                    <div className="product-form__item">
                      <label className="header">
                        Color: <span className="slVariant">{selectedColor}</span>
                      </label>
                      <ColorItems data={productData} selectedColor={selectedColor} change={colorChangeHandler} currentSku={currentSku} />                     
                    </div>
                  </div>
                  <div
                    className="swatch clearfix swatch-1 option2"
                    data-option-index="1"
                  >
                    <div className="product-form__item">
                      <label className="header">
                        Size: <span className="slVariant">{selectedSize}</span>
                      </label>
                      <SizeItems data={productData} selectedSize={selectedSize} change={sizeChangeHandler} />                     
                    </div>
                  </div>
                  {actionHtml}
                </form>
                <div className="userViewMsg" data-user="20" data-time="11000">
                  <i className="fa fa-users" aria-hidden="true"></i>{" "}
                  <strong className="uersView">14</strong> PEOPLE ARE LOOKING
                  FOR THIS PRODUCT
                </div>
              </div>
            </div>
          </div>
          {/*End-product-single*/}
          {/*Product Tabs*/}
          <div className="tabs-listing">
            <ul className="product-tabs">
              <li rel="tab1">
                <a className="tablink">Product Details</a>
              </li>
              <li rel="tab3">
                <a className="tablink">Size Chart</a>
              </li>
              <li rel="tab4">
                <a className="tablink">Shipping &amp; Returns</a>
              </li>
            </ul>
            <div className="tab-container">
              <div id="tab1" className="tab-content">
                <div className="product-description rte">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </p>
                  <ul>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </li>
                    <li>Sed ut perspiciatis unde omnis iste natus error sit</li>
                    <li>
                      Neque porro quisquam est qui dolorem ipsum quia dolor
                    </li>
                    <li>Lorem Ipsum is not simply random text.</li>
                    <li>Free theme updates</li>
                  </ul>
                  <h3>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem
                  </h3>
                  <p>
                    You can change the position of any sections such as slider,
                    banner, products, collection and so on by just dragging and
                    dropping.&nbsp;
                  </p>
                  <h3>Lorem Ipsum is not simply random text.</h3>
                  <p>
                    But I must explain to you how all this mistaken idea of
                    denouncing pleasure and praising pain was born and I will
                    give you a complete account of the system, and expound the
                    actual teachings of the great explorer of the truth, the
                    master-builder of human happiness.
                  </p>
                  <p>
                    Change colors, fonts, banners, megamenus and more. Preview
                    changes are live before saving them.
                  </p>
                  <h3>1914 translation by H. Rackham</h3>
                  <p>
                    But I must explain to you how all this mistaken idea of
                    denouncing pleasure and praising pain was born and I will
                    give you a complete account of the system, and expound the
                    actual teachings of the great explorer of the truth, the
                    master-builder of human happiness.
                  </p>
                  <h3>
                    Section 1.10.33 of "de Finibus Bonorum et Malorum", written
                    by Cicero in 45 BC
                  </h3>
                  <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                    corrupti quos dolores et quas molestias excepturi sint
                    occaecati cupiditate non provident, similique sunt in culpa
                    qui officia deserunt mollitia animi, id est laborum et
                    dolorum fuga.
                  </p>
                  <h3>
                    The standard Lorem Ipsum passage, used since the 1500s
                  </h3>
                  <p>
                    You can use variant style from colors, images or variant
                    images. Also available differnt type of design styles and
                    size.
                  </p>
                  <h3>Lorem Ipsum is not simply random text.</h3>
                  <p>
                    But I must explain to you how all this mistaken idea of
                    denouncing pleasure and praising pain was born and I will
                    give you a complete account of the system, and expound the
                    actual teachings of the great explorer of the truth, the
                    master-builder of human happiness.
                  </p>
                  <h3>Proin ut lacus eget elit molestie posuere.</h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled.
                  </p>
                </div>
              </div>

              <div id="tab3" className="tab-content">
                <h3>WOMEN'S BODY SIZING CHART</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>Size</th>
                      <th>XS</th>
                      <th>S</th>
                      <th>M</th>
                      <th>L</th>
                      <th>XL</th>
                    </tr>
                    <tr>
                      <td>Chest</td>
                      <td>31" - 33"</td>
                      <td>33" - 35"</td>
                      <td>35" - 37"</td>
                      <td>37" - 39"</td>
                      <td>39" - 42"</td>
                    </tr>
                    <tr>
                      <td>Waist</td>
                      <td>24" - 26"</td>
                      <td>26" - 28"</td>
                      <td>28" - 30"</td>
                      <td>30" - 32"</td>
                      <td>32" - 35"</td>
                    </tr>
                    <tr>
                      <td>Hip</td>
                      <td>34" - 36"</td>
                      <td>36" - 38"</td>
                      <td>38" - 40"</td>
                      <td>40" - 42"</td>
                      <td>42" - 44"</td>
                    </tr>
                    <tr>
                      <td>Regular inseam</td>
                      <td>30"</td>
                      <td>30½"</td>
                      <td>31"</td>
                      <td>31½"</td>
                      <td>32"</td>
                    </tr>
                    <tr>
                      <td>Long (Tall) Inseam</td>
                      <td>31½"</td>
                      <td>32"</td>
                      <td>32½"</td>
                      <td>33"</td>
                      <td>33½"</td>
                    </tr>
                  </tbody>
                </table>
                <h3>MEN'S BODY SIZING CHART</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>Size</th>
                      <th>XS</th>
                      <th>S</th>
                      <th>M</th>
                      <th>L</th>
                      <th>XL</th>
                      <th>XXL</th>
                    </tr>
                    <tr>
                      <td>Chest</td>
                      <td>33" - 36"</td>
                      <td>36" - 39"</td>
                      <td>39" - 41"</td>
                      <td>41" - 43"</td>
                      <td>43" - 46"</td>
                      <td>46" - 49"</td>
                    </tr>
                    <tr>
                      <td>Waist</td>
                      <td>27" - 30"</td>
                      <td>30" - 33"</td>
                      <td>33" - 35"</td>
                      <td>36" - 38"</td>
                      <td>38" - 42"</td>
                      <td>42" - 45"</td>
                    </tr>
                    <tr>
                      <td>Hip</td>
                      <td>33" - 36"</td>
                      <td>36" - 39"</td>
                      <td>39" - 41"</td>
                      <td>41" - 43"</td>
                      <td>43" - 46"</td>
                      <td>46" - 49"</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center">
                  <img src="assets/images/size.jpg" alt="" />
                </div>
              </div>

              <div id="tab4" className="tab-content">
                <h4>Returns Policy</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  eros justo, accumsan non dui sit amet. Phasellus semper
                  volutpat mi sed imperdiet. Ut odio lectus, vulputate non ex
                  non, mattis sollicitudin purus. Mauris consequat justo a enim
                  interdum, in consequat dolor accumsan. Nulla iaculis diam
                  purus, ut vehicula leo efficitur at.
                </p>
                <p>
                  Interdum et malesuada fames ac ante ipsum primis in faucibus.
                  In blandit nunc enim, sit amet pharetra erat aliquet ac.
                </p>
                <h4>Shipping</h4>
                <p>
                  Pellentesque ultrices ut sem sit amet lacinia. Sed nisi dui,
                  ultrices ut turpis pulvinar. Sed fringilla ex eget lorem
                  consectetur, consectetur blandit lacus varius. Duis vel
                  scelerisque elit, et vestibulum metus. Integer sit amet
                  tincidunt tortor. Ut lacinia ullamcorper massa, a fermentum
                  arcu vehicula ut. Ut efficitur faucibus dui Nullam tristique
                  dolor eget turpis consequat varius. Quisque a interdum augue.
                  Nam ut nibh mauris.
                </p>
              </div>
            </div>
          </div>
          {/*End Product Tabs*/}

          {/*Related Product Slider*/}
          <div className="related-product grid-products">
            <header className="section-header">
              <h2 className="section-header__title text-center h2">
                <span>Related Products</span>
              </h2>
              <p className="sub-heading">
                You can stop autoplay, increase/decrease aniamtion speed and
                number of grid to show and products from store admin.
              </p>
            </header>
            <div className="productPageSlider">
              <div className="col-12 item">
                {/*start product image*/}
                <div className="product-image">
                  {/*start product image*/}
                  <a href="#">
                    {/*image*/}
                    <img
                      className="primary blur-up lazyload"
                      data-src="assets/images/product-images/product-image1.jpg"
                      src="assets/images/product-images/product-image1.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End image*/}
                    {/*Hover image*/}
                    <img
                      className="hover blur-up lazyload"
                      data-src="assets/images/product-images/product-image1-1.jpg"
                      src="assets/images/product-images/product-image1-1.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End hover image*/}
                    {/*product label*/}
                    <div className="product-labels rectangular">
                      <span className="lbl on-sale">-16%</span>{" "}
                      <span className="lbl pr-label1">new</span>
                    </div>
                    {/*End product label*/}
                  </a>
                  {/*end product image*/}

                  {/*Start product button*/}
                  <form className="variants add" action="#" method="post">
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
                      className="quick-view"
                      tabIndex="0"
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
                  </div>
                  {/*end product button*/}
                </div>
                {/*end product image*/}
                {/*start product details*/}
                <div className="product-details text-center">
                  {/*product name*/}
                  <div className="product-name">
                    <a href="#">Edna Dress</a>
                  </div>
                  {/*End product name*/}
                  {/*product price*/}
                  <div className="product-price">
                    <span className="old-price">$500.00</span>
                    <span className="price">$600.00</span>
                  </div>
                  {/*End product price*/}

                  <div className="product-review">
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star-o"></i>
                    <i className="font-13 fa fa-star-o"></i>
                  </div>
                  {/*Variant*/}
                  <ul className="swatches">
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant1.jpg"
                        alt="image"
                      />
                    </li>
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant2.jpg"
                        alt="image"
                      />
                    </li>
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant3.jpg"
                        alt="image"
                      />
                    </li>
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant4.jpg"
                        alt="image"
                      />
                    </li>
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant5.jpg"
                        alt="image"
                      />
                    </li>
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant6.jpg"
                        alt="image"
                      />
                    </li>
                  </ul>
                  {/*End Variant*/}
                </div>
                {/*End product details*/}
              </div>
              <div className="col-12 item">
                {/*start product image*/}
                <div className="product-image">
                  {/*start product image*/}
                  <a href="#">
                    {/*image*/}
                    <img
                      className="primary blur-up lazyload"
                      data-src="assets/images/product-images/product-image2.jpg"
                      src="assets/images/product-images/product-image2.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End image*/}
                    {/*Hover image*/}
                    <img
                      className="hover blur-up lazyload"
                      data-src="assets/images/product-images/product-image2-1.jpg"
                      src="assets/images/product-images/product-image2-1.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End hover image*/}
                  </a>
                  {/*end product image*/}

                  {/*Start product button*/}
                  <form className="variants add" action="#" method="post">
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
                      className="quick-view"
                      tabIndex="0"
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
                  </div>
                  {/*end product button*/}
                </div>
                {/*end product image*/}

                {/*start product details*/}
                <div className="product-details text-center">
                  {/*product name*/}
                  <div className="product-name">
                    <a href="#">Elastic Waist Dress</a>
                  </div>
                  {/*End product name*/}
                  {/*product price*/}
                  <div className="product-price">
                    <span className="price">$748.00</span>
                  </div>
                  {/*End product price*/}
                  <div className="product-review">
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                  </div>
                  {/*Variant*/}
                  <ul className="swatches">
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant2-1.jpg"
                        alt="image"
                      />
                    </li>
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant2-2.jpg"
                        alt="image"
                      />
                    </li>
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant2-3.jpg"
                        alt="image"
                      />
                    </li>
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant2-4.jpg"
                        alt="image"
                      />
                    </li>
                  </ul>
                  {/*End Variant*/}
                </div>
                {/*End product details*/}
              </div>
              <div className="col-12 item">
                {/*start product image*/}
                <div className="product-image">
                  {/*start product image*/}
                  <a href="#">
                    {/*image*/}
                    <img
                      className="primary blur-up lazyload"
                      data-src="assets/images/product-images/product-image3.jpg"
                      src="assets/images/product-images/product-image3.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End image*/}
                    {/*Hover image*/}
                    <img
                      className="hover blur-up lazyload"
                      data-src="assets/images/product-images/product-image3-1.jpg"
                      src="assets/images/product-images/product-image3-1.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End hover image*/}
                    {/*product label*/}
                    <div className="product-labels rectangular">
                      <span className="lbl pr-label2">Hot</span>
                    </div>
                    {/*End product label*/}
                  </a>
                  {/*end product image*/}

                  {/*Start product button*/}
                  <form className="variants add" action="#" method="post">
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
                      className="quick-view"
                      tabIndex="0"
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
                  </div>
                  {/*end product button*/}
                </div>
                {/*end product image*/}

                {/*start product details*/}
                <div className="product-details text-center">
                  {/*product name*/}
                  <div className="product-name">
                    <a href="#">3/4 Sleeve Kimono Dress</a>
                  </div>
                  {/*End product name*/}
                  {/*product price*/}
                  <div className="product-price">
                    <span className="price">$550.00</span>
                  </div>
                  {/*End product price*/}

                  <div className="product-review">
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star-o"></i>
                  </div>
                  {/*Variant*/}
                  <ul className="swatches">
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant3-1.jpg"
                        alt="image"
                      />
                    </li>
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant3-2.jpg"
                        alt="image"
                      />
                    </li>
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant3-3.jpg"
                        alt="image"
                      />
                    </li>
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant3-4.jpg"
                        alt="image"
                      />
                    </li>
                  </ul>
                  {/*End Variant*/}
                </div>
                {/*End product details*/}
              </div>
              <div className="col-12 item">
                {/*start product image*/}
                <div className="product-image">
                  {/*start product image*/}
                  <a href="#">
                    {/*image*/}
                    <img
                      className="primary blur-up lazyload"
                      data-src="assets/images/product-images/product-image4.jpg"
                      src="assets/images/product-images/product-image4.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End image*/}
                    {/*Hover image*/}
                    <img
                      className="hover blur-up lazyload"
                      data-src="assets/images/product-images/product-image4-1.jpg"
                      src="assets/images/product-images/product-image4-1.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End hover image*/}
                    {/*product label*/}
                    <div className="product-labels">
                      <span className="lbl on-sale">Sale</span>
                    </div>
                    {/*End product label*/}
                  </a>
                  {/*end product image*/}

                  {/*Start product button*/}
                  <form className="variants add" action="#" method="post">
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
                      className="quick-view"
                      tabIndex="0"
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
                  </div>
                  {/*end product button*/}
                </div>
                {/*end product image*/}

                {/*start product details*/}
                <div className="product-details text-center">
                  {/*product name*/}
                  <div className="product-name">
                    <a href="#">Cape Dress</a>
                  </div>
                  {/*End product name*/}
                  {/*product price*/}
                  <div className="product-price">
                    <span className="old-price">$900.00</span>
                    <span className="price">$788.00</span>
                  </div>
                  {/*End product price*/}

                  <div className="product-review">
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star-o"></i>
                    <i className="font-13 fa fa-star-o"></i>
                  </div>
                  {/*Variant*/}
                  <ul className="swatches">
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant4-1.jpg"
                        alt="image"
                      />
                    </li>
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant4-2.jpg"
                        alt="image"
                      />
                    </li>
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant4-3.jpg"
                        alt="image"
                      />
                    </li>
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant4-4.jpg"
                        alt="image"
                      />
                    </li>
                  </ul>
                  {/*End Variant*/}
                </div>
                {/*End product details*/}
              </div>
              <div className="col-12 item">
                {/*start product image*/}
                <div className="product-image">
                  {/*start product image*/}
                  <a href="#">
                    {/*image*/}
                    <img
                      className="primary blur-up lazyload"
                      data-src="assets/images/product-images/product-image5.jpg"
                      src="assets/images/product-images/product-image5.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End image*/}
                    {/*Hover image*/}
                    <img
                      className="hover blur-up lazyload"
                      data-src="assets/images/product-images/product-image5-1.jpg"
                      src="assets/images/product-images/product-image5-1.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End hover image*/}
                    {/*product label*/}
                    <div className="product-labels">
                      <span className="lbl on-sale">Sale</span>
                    </div>
                    {/*End product label*/}
                  </a>
                  {/*end product image*/}

                  {/*Start product button*/}
                  <form className="variants add" action="#" method="post">
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
                      className="quick-view"
                      tabIndex="0"
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
                  </div>
                  {/*end product button*/}
                </div>
                {/*end product image*/}

                {/*start product details*/}
                <div className="product-details text-center">
                  {/*product name*/}
                  <div className="product-name">
                    <a href="#">Paper Dress</a>
                  </div>
                  {/*End product name*/}
                  {/*product price*/}
                  <div className="product-price">
                    <span className="price">$550.00</span>
                  </div>
                  {/*End product price*/}

                  <div className="product-review">
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                  </div>
                  {/*Variant*/}
                  <ul className="swatches">
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant3-1.jpg"
                        alt="image"
                      />
                    </li>
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant3-2.jpg"
                        alt="image"
                      />
                    </li>
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant3-3.jpg"
                        alt="image"
                      />
                    </li>
                    <li className="swatch medium rounded">
                      <img
                        src="assets/images/product-images/variant3-4.jpg"
                        alt="image"
                      />
                    </li>
                  </ul>
                  {/*End Variant*/}
                </div>
                {/*End product details*/}
              </div>
              <div className="col-12 item">
                {/*start product image*/}
                <div className="product-image">
                  {/*start product image*/}
                  <a href="#">
                    {/*image*/}
                    <img
                      className="primary blur-up lazyload"
                      data-src="assets/images/product-images/product-image6.jpg"
                      src="assets/images/product-images/product-image6.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End image*/}
                    {/*Hover image*/}
                    <img
                      className="hover blur-up lazyload"
                      data-src="assets/images/product-images/product-image6-1.jpg"
                      src="assets/images/product-images/product-image6-1.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End hover image*/}
                    {/*product label*/}
                    <div className="product-labels rectangular">
                      <span className="lbl on-sale">-16%</span>{" "}
                      <span className="lbl pr-label1">new</span>
                    </div>
                    {/*End product label*/}
                  </a>
                  {/*end product image*/}

                  {/*Start product button*/}
                  <form className="variants add" action="#" method="post">
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
                      className="quick-view"
                      tabIndex="0"
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
                  </div>
                  {/*end product button*/}
                </div>
                {/*end product image*/}

                {/*start product details*/}
                <div className="product-details text-center">
                  {/*product name*/}
                  <div className="product-name">
                    <a href="#">Zipper Jacket</a>
                  </div>
                  {/*End product name*/}
                  {/*product price*/}
                  <div className="product-price">
                    <span className="price">$788.00</span>
                  </div>
                  {/*End product price*/}

                  <div className="product-review">
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star-o"></i>
                    <i className="font-13 fa fa-star-o"></i>
                  </div>
                </div>
                {/*End product details*/}
              </div>
              <div className="col-12 item">
                {/*start product image*/}
                <div className="product-image">
                  {/*start product image*/}
                  <a href="#">
                    {/*image*/}
                    <img
                      className="primary blur-up lazyload"
                      data-src="assets/images/product-images/product-image7.jpg"
                      src="assets/images/product-images/product-image7.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End image*/}
                    {/*Hover image*/}
                    <img
                      className="hover blur-up lazyload"
                      data-src="assets/images/product-images/product-image7-1.jpg"
                      src="assets/images/product-images/product-image7-1.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End hover image*/}
                  </a>
                  {/*end product image*/}

                  {/*Start product button*/}
                  <form className="variants add" action="#" method="post">
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
                      className="quick-view"
                      tabIndex="0"
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
                  </div>
                  {/*end product button*/}
                </div>
                {/*end product image*/}

                {/*start product details*/}
                <div className="product-details text-center">
                  {/*product name*/}
                  <div className="product-name">
                    <a href="#">Zipper Jacket</a>
                  </div>
                  {/*End product name*/}
                  {/*product price*/}
                  <div className="product-price">
                    <span className="price">$748.00</span>
                  </div>
                  {/*End product price*/}
                  <div className="product-review">
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                    <i className="font-13 fa fa-star"></i>
                  </div>
                </div>
                {/*End product details*/}
              </div>
            </div>
          </div>
          {/*End Related Product Slider*/}

          {/*Recently Product Slider*/}
          <div className="related-product grid-products">
            <header className="section-header">
              <h2 className="section-header__title text-center h2">
                <span>Recently Viewed Product</span>
              </h2>
              <p className="sub-heading">
                You can manage this section from store admin as describe in
                above section
              </p>
            </header>
            <div className="productPageSlider">
              <div className="col-12 item">
                {/*start product image*/}
                <div className="product-image">
                  {/*start product image*/}
                  <a href="#">
                    {/*image*/}
                    <img
                      className="primary blur-up lazyload"
                      data-src="assets/images/product-images/product-image6.jpg"
                      src="assets/images/product-images/product-image6.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End image*/}
                    {/*Hover image*/}
                    <img
                      className="hover blur-up lazyload"
                      data-src="assets/images/product-images/product-image6-1.jpg"
                      src="assets/images/product-images/product-image6-1.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End hover image*/}
                    {/*product label*/}
                    <div className="product-labels rectangular">
                      <span className="lbl on-sale">-16%</span>{" "}
                      <span className="lbl pr-label1">new</span>
                    </div>
                    {/*End product label*/}
                  </a>
                  {/*end product image*/}
                </div>
                {/*end product image*/}

                {/*start product details*/}
                <div className="product-details text-center">
                  {/*product name*/}
                  <div className="product-name">
                    <a href="#">Zipper Jacket</a>
                  </div>
                  {/*End product name*/}
                </div>
                {/*End product details*/}
              </div>
              <div className="col-12 item">
                {/*start product image*/}
                <div className="product-image">
                  {/*start product image*/}
                  <a href="#">
                    {/*image*/}
                    <img
                      className="primary blur-up lazyload"
                      data-src="assets/images/product-images/product-image7.jpg"
                      src="assets/images/product-images/product-image7.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End image*/}
                    {/*Hover image*/}
                    <img
                      className="hover blur-up lazyload"
                      data-src="assets/images/product-images/product-image7-1.jpg"
                      src="assets/images/product-images/product-image7-1.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End hover image*/}
                  </a>
                  {/*end product image*/}
                </div>
                {/*end product image*/}

                {/*start product details*/}
                <div className="product-details text-center">
                  {/*product name*/}
                  <div className="product-name">
                    <a href="#">Zipper Jacket</a>
                  </div>
                  {/*End product name*/}
                </div>
                {/*End product details*/}
              </div>
              <div className="col-12 item">
                {/*start product image*/}
                <div className="product-image">
                  {/*start product image*/}
                  <a href="#">
                    {/*image*/}
                    <img
                      className="primary blur-up lazyload"
                      data-src="assets/images/product-images/product-image8.jpg"
                      src="assets/images/product-images/product-image8.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End image*/}
                    {/*Hover image*/}
                    <img
                      className="hover blur-up lazyload"
                      data-src="assets/images/product-images/product-image8-1.jpg"
                      src="assets/images/product-images/product-image8-1.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End hover image*/}
                  </a>
                  {/*end product image*/}
                </div>

                {/*end product image*/}

                {/*start product details*/}
                <div className="product-details text-center">
                  {/*product name*/}
                  <div className="product-name">
                    <a href="#">Workers Shirt Jacket</a>
                  </div>
                  {/*End product name*/}
                </div>
                {/*End product details*/}
              </div>
              <div className="col-12 item">
                {/*start product image*/}
                <div className="product-image">
                  {/*start product image*/}
                  <a href="#">
                    {/*image*/}
                    <img
                      className="primary blur-up lazyload"
                      data-src="assets/images/product-images/product-image9.jpg"
                      src="assets/images/product-images/product-image9.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End image*/}
                    {/*Hover image*/}
                    <img
                      className="hover blur-up lazyload"
                      data-src="assets/images/product-images/product-image9-1.jpg"
                      src="assets/images/product-images/product-image9-1.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End hover image*/}
                  </a>
                  {/*end product image*/}
                </div>
                {/*end product image*/}

                {/*start product details*/}
                <div className="product-details text-center">
                  {/*product name*/}
                  <div className="product-name">
                    <a href="#">Watercolor Sport Jacket in Brown/Blue</a>
                  </div>
                  {/*End product name*/}
                </div>
                {/*End product details*/}
              </div>
              <div className="col-12 item">
                {/*start product image*/}
                <div className="product-image">
                  {/*start product image*/}
                  <a href="#">
                    {/*image*/}
                    <img
                      className="primary blur-up lazyload"
                      data-src="assets/images/product-images/product-image10.jpg"
                      src="assets/images/product-images/product-image10.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End image*/}
                    {/*Hover image*/}
                    <img
                      className="hover blur-up lazyload"
                      data-src="assets/images/product-images/product-image10-1.jpg"
                      src="assets/images/product-images/product-image10-1.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End hover image*/}
                  </a>
                  {/*end product image*/}
                </div>
                {/*end product image*/}

                {/*start product details*/}
                <div className="product-details text-center">
                  {/*product name*/}
                  <div className="product-name">
                    <a href="#">Washed Wool Blazer</a>
                  </div>
                  {/*End product name*/}
                </div>
                {/*End product details*/}
              </div>
              <div className="col-12 item">
                {/*start product image*/}
                <div className="product-image">
                  {/*start product image*/}
                  <a href="#">
                    {/*image*/}
                    <img
                      className="primary blur-up lazyload"
                      data-src="assets/images/product-images/product-image13.jpg"
                      src="assets/images/product-images/product-image13.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End image*/}
                    {/*Hover image*/}
                    <img
                      className="hover blur-up lazyload"
                      data-src="assets/images/product-images/product-image13-1.jpg"
                      src="assets/images/product-images/product-image13-1.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End hover image*/}
                  </a>
                  {/*end product image*/}
                </div>

                {/*end product image*/}

                {/*start product details*/}
                <div className="product-details text-center">
                  {/*product name*/}
                  <div className="product-name">
                    <a href="#">Ashton Necklace</a>
                  </div>
                  {/*End product name*/}
                </div>
                {/*End product details*/}
              </div>
              <div className="col-12 item">
                {/*start product image*/}
                <div className="product-image">
                  {/*start product image*/}
                  <a href="#">
                    {/*image*/}
                    <img
                      className="primary blur-up lazyload"
                      data-src="assets/images/product-images/product-image14.jpg"
                      src="assets/images/product-images/product-image14.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End image*/}
                    {/*Hover image*/}
                    <img
                      className="hover blur-up lazyload"
                      data-src="assets/images/product-images/product-image14-1.jpg"
                      src="assets/images/product-images/product-image14-1.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End hover image*/}
                  </a>
                  {/*end product image*/}
                </div>
                {/*end product image*/}

                {/*start product details*/}
                <div className="product-details text-center">
                  {/*product name*/}
                  <div className="product-name">
                    <a href="#">Ara Ring</a>
                  </div>
                  {/*End product name*/}
                </div>
                {/*End product details*/}
              </div>
              <div className="col-12 item">
                {/*start product image*/}
                <div className="product-image">
                  {/*start product image*/}
                  <a href="#">
                    {/*image*/}
                    <img
                      className="primary blur-up lazyload"
                      data-src="assets/images/product-images/product-image15.jpg"
                      src="assets/images/product-images/product-image15.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End image*/}
                    {/*Hover image*/}
                    <img
                      className="hover blur-up lazyload"
                      data-src="assets/images/product-images/product-image15-1.jpg"
                      src="assets/images/product-images/product-image15-1.jpg"
                      alt="image"
                      title="product"
                    />
                    {/*End hover image*/}
                  </a>
                  {/*end product image*/}
                </div>
                {/*end product image*/}

                {/*start product details*/}
                <div className="product-details text-center">
                  {/*product name*/}
                  <div className="product-name">
                    <a href="#">Ara Ring</a>
                  </div>
                  {/*End product name*/}
                </div>
                {/*End product details*/}
              </div>
            </div>
          </div>
          {/*End Recently Product Slider*/}
        </div>
        {/*#ProductSection-product-template*/}
      </div>

      <div className="hide">
        <div id="sizechart">
          <h3>WOMEN'S BODY SIZING CHART</h3>
          <table>
            <tbody>
              <tr>
                <th>Size</th>
                <th>XS</th>
                <th>S</th>
                <th>M</th>
                <th>L</th>
                <th>XL</th>
              </tr>
              <tr>
                <td>Chest</td>
                <td>31" - 33"</td>
                <td>33" - 35"</td>
                <td>35" - 37"</td>
                <td>37" - 39"</td>
                <td>39" - 42"</td>
              </tr>
              <tr>
                <td>Waist</td>
                <td>24" - 26"</td>
                <td>26" - 28"</td>
                <td>28" - 30"</td>
                <td>30" - 32"</td>
                <td>32" - 35"</td>
              </tr>
              <tr>
                <td>Hip</td>
                <td>34" - 36"</td>
                <td>36" - 38"</td>
                <td>38" - 40"</td>
                <td>40" - 42"</td>
                <td>42" - 44"</td>
              </tr>
              <tr>
                <td>Regular inseam</td>
                <td>30"</td>
                <td>30½"</td>
                <td>31"</td>
                <td>31½"</td>
                <td>32"</td>
              </tr>
              <tr>
                <td>Long (Tall) Inseam</td>
                <td>31½"</td>
                <td>32"</td>
                <td>32½"</td>
                <td>33"</td>
                <td>33½"</td>
              </tr>
            </tbody>
          </table>
          <h3>MEN'S BODY SIZING CHART</h3>
          <table>
            <tbody>
              <tr>
                <th>Size</th>
                <th>XS</th>
                <th>S</th>
                <th>M</th>
                <th>L</th>
                <th>XL</th>
                <th>XXL</th>
              </tr>
              <tr>
                <td>Chest</td>
                <td>33" - 36"</td>
                <td>36" - 39"</td>
                <td>39" - 41"</td>
                <td>41" - 43"</td>
                <td>43" - 46"</td>
                <td>46" - 49"</td>
              </tr>
              <tr>
                <td>Waist</td>
                <td>27" - 30"</td>
                <td>30" - 33"</td>
                <td>33" - 35"</td>
                <td>36" - 38"</td>
                <td>38" - 42"</td>
                <td>42" - 45"</td>
              </tr>
              <tr>
                <td>Hip</td>
                <td>33" - 36"</td>
                <td>36" - 39"</td>
                <td>39" - 41"</td>
                <td>41" - 43"</td>
                <td>43" - 46"</td>
                <td>46" - 49"</td>
              </tr>
            </tbody>
          </table>
          <div style={{ paddingLeft: "30px" }}>
            <img src="assets/images/size.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className="hide"></div>
      <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="pswp__bg"></div>
        <div className="pswp__scroll-wrap">
          <div className="pswp__container">
            <div className="pswp__item"></div>
            <div className="pswp__item"></div>
            <div className="pswp__item"></div>
          </div>
          <div className="pswp__ui pswp__ui--hidden">
            <div className="pswp__top-bar">
              <div className="pswp__counter"></div>
              <button
                className="pswp__button pswp__button--close"
                title="Close (Esc)"
              ></button>
              <button
                className="pswp__button pswp__button--share"
                title="Share"
              ></button>
              <button
                className="pswp__button pswp__button--fs"
                title="Toggle fullscreen"
              ></button>
              <button
                className="pswp__button pswp__button--zoom"
                title="Zoom in/out"
              ></button>
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip"></div>
            </div>
            <button
              className="pswp__button pswp__button--arrow--left"
              title="Previous (arrow left)"
            ></button>
            <button
              className="pswp__button pswp__button--arrow--right"
              title="Next (arrow right)"
            ></button>
            <div className="pswp__caption">
              <div className="pswp__caption__center"></div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Product;