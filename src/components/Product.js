import $ from "jquery";
import slick from "slick-carousel";
import * as PhotoSwipe from "photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import { Fragment, useContext, useEffect, useState } from "react";
import { getProductById } from "../actions/product-action";
import { updateUserCart, updateCartItems } from "../actions/user-action";
import ProductRate from "./ProductRate";
import ColorItems from "./ColorItems";
import SizeItems from "./SizeItems";
import parse from "html-react-parser";
import { Link, useHistory, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';
import AuthContext from "../store/auth-context";
import { hostPath } from "../actions/sharedConst";

window.jQuery = window.$ = $;
require("ez-plus");

let rndInt = 0;

const Product = (props) => {
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const { id } = params;
  const history = useHistory();

  const [productData, setProduct] = useState({});
  const [currentSku, setCurrentSku] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [colorHasNone, setColorHasNone] = useState(false);
  const [sizeHasNone, setSizeHasNone] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [detail, setDetail] = useState(parse(""));
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);

  useEffect(() => {
    document.body.classList.add("template-product");
  }, []);

  useEffect(() => {
    $(".zoomContainer").remove();

    rndInt = Math.floor(Math.random() * 200) + 1;
    getProductById(id).then((item) => {
      const newItem = {...item};
      //必須先將 ColorItem 隱藏才不會被 render
      setColorHasNone(true);
      setSizeHasNone(true);

      setProduct(newItem);
      setCurrentSku(newItem.sku[0]);
      product_slider_ppage();
      setTabs();
      imgPopup();
    });
  }, [id, getProductById]);

  useEffect(() => {
    if (Object.keys(productData).length !== 0) {
      setSelectedColor(productData.sku[0].color);
      setSelectedSize(productData.sku[0].size);
      setDetail(parse(productData.detail));

      const cHasNone = productData.sku.some(x=> x.color === "None");
      const sHasNone = productData.sku.some(x=> x.size === "None");
      setColorHasNone(cHasNone);
      setSizeHasNone(sHasNone);
    }
  }, [productData]);

  const toCartDetail = () => {
    history.replace(hostPath + "/Cart");
  };

  const addToCart = () => {
    const cartItem = {
      productId: id,
      title: productData.title,
      sku: currentSku,
      unitPrice: currentSku.price,
      quantity: orderQuantity,
      subtotal: (currentSku.price * orderQuantity),
      img: productData.largeImgs[0].src
    };

    if (authCtx.isLoggedIn) {    
      const cartData = [...authCtx.cart.cartItems];
      const updatedData = updateCartItems(cartItem, cartData, orderQuantity);
      const newUserCartData = {
        uid: authCtx.uid,
        token: authCtx.token,
        cartItems: updatedData
      };

      updateUserCart(newUserCartData).then((data) => {
        if (data.returnCode !== -1) {
          authCtx.updateCartData(newUserCartData, true);
        }
      });
    } else {
      const newUserCartData = {
        uid: authCtx.uid,
        token: authCtx.token,
        cartItems: !cookies.cart
          ? [cartItem]
          : updateCartItems(cartItem, cookies.cart.cartItems, orderQuantity),
      };
      var expiredDate = new Date();
      expiredDate.setDate(new Date().getDate()+7);
      setCookie("cart", JSON.stringify(newUserCartData), { path: "/" ,expires: expiredDate});
      authCtx.updateCartData(newUserCartData, true);
    }
  };

  const orderQuantityChangeHandler = (event) => {
    const quantity =
      currentSku.stock >= event.target.value
        ? event.target.value
        : currentSku.stock;
    setOrderQuantity(quantity);
  };

  const increaseQuantity = () => {
    let updatedQuantiy = orderQuantity;
    updatedQuantiy =
      currentSku.stock > updatedQuantiy ? updatedQuantiy + 1 : updatedQuantiy;
    setOrderQuantity(updatedQuantiy);
  };

  const decreaseQuantity = () => {
    let updatedQuantiy = orderQuantity;
    updatedQuantiy = updatedQuantiy !== 1 ? updatedQuantiy - 1 : updatedQuantiy;
    setOrderQuantity(updatedQuantiy);
  };

  const colorChangeHandler = (color) => {
    setSelectedColor(color);

    const newSku = productData.sku.find(x=> x.color === color && x.size === selectedSize);
    setCurrentSku(newSku);
  };

  const sizeChangeHandler = (size) => {
    setSelectedSize(size);

    const newSku = productData.sku.find(x=> x.size === size && x.color === selectedColor);
    setCurrentSku(newSku);
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
        shareEl: false,
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
      slidesToShow: 3,
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
      attrImageZoomSrc: ""
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
            onClick={addToCart}
          >
            <span>Add to cart</span>
          </button>
        </div>
        <div className="shopify-payment-button" data-shopify="payment-button">
          <button
            type="button"
            className="shopify-payment-button__button shopify-payment-button__button--unbranded"
            onClick={toCartDetail}
          >
            Buy it now
          </button>
        </div>
      </div>
    );
  }

  let initImg =
    Object.keys(productData).length !== 0
      ? productData.largeImgs.filter((item) => item.detail === true)[0].src
      : "";
  initImg = require("../" + initImg).default;

  const ImgGallery = (props) => {
    const [imgs, setImgs] = useState([]);

    useEffect(() => {
      getDistinctImgs();
    }, [props.data]);

    useEffect(() => {
      if (imgs.length !== 0) {
        product_thumb();
        product_zoom();
      }
    }, [imgs]);

    const getDistinctImgs = () => {
      const filterImgs = props.data.filter((item) => item.detail === true);
      const distinctImgs = [...new Set(filterImgs.map((item) => item.src))];
      setImgs(distinctImgs);
    };

    return (
      <div id="gallery" className="product-dec-slider-2 product-tab-left">
        {imgs.map((item, index) => {
          return (
            <a
              data-image={require("../" + item).default}
              data-zoom-image={require("../" + item).default}
              aria-hidden="true"
              tabIndex="-1"
              key={`gallery_${index}`}
            >
              <img
                src={require("../" + item).default}
                alt={productData.title}
              />
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <Fragment>
      {Object.keys(productData).length !== 0 && (
        <div id="MainContent" className="main-content" role="main">
          {/*Breadcrumb*/}
          <div className="bredcrumbWrap">
            <div className="container breadcrumbs">
              <Link to={hostPath}>Home</Link>
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
                      {Object.keys(productData).length !== 0 && (
                        <ImgGallery data={productData.largeImgs} />
                      )}
                    </div>
                    <div className="zoompro-wrap product-zoom-right pl-20">
                      <div className="zoompro-span">
                        <img
                          className="zoompro"
                          data-zoom-image={initImg}
                          alt={productData.title}
                          src={initImg}
                        />
                      </div>
                      <div className="product-labels">
                        <span className="lbl on-sale">Sale</span>
                        <span className="lbl pr-label1">new</span>
                      </div>
                      {!colorHasNone && !sizeHasNone && (
                        <div className="product-buttons">
                          <a className="btn prlightbox" title="Zoom">
                            <i
                              className="icon anm anm-expand-l-arrows"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="lightboximages">
                      {productData.largeImgs.map((item, index) => (
                        <a
                          href={require("../" + item.src).default}
                          data-size="550x550"
                          key={`lightboxImg_${index}`}
                        ></a>
                      ))}
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
                        {currentSku.stock !== 0 && (
                          <span className="instock ">In Stock</span>
                        )}
                        {currentSku.stock === 0 && (
                          <span className="outstock">Unavailable</span>
                        )}
                      </div>
                      <div className="product-sku">
                        SKU:
                        <span className="variant-sku">{currentSku.id}</span>
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
                        <span className="money">
                          ${currentSku.originalPrice}
                        </span>
                      </s>
                      <span className="product-price__price product-price__price-product-template product-price__sale product-price__sale--single">
                        <span id="ProductPrice-product-template">
                          <span className="money">${currentSku.price}</span>
                        </span>
                      </span>
                    </p>
                  </div>
                  <div className="product-single__description rte">
                    {parse(productData.desc)}
                  </div>
                  <div id="quantity_message">
                    <span className="items">{currentSku.stock}</span> left in
                    stock.
                  </div>
                  <form
                    id="product_form_10508262282"
                    className="product-form product-form-product-template hidedropdown"
                  >
                    {!colorHasNone && (
                      <div
                        className="swatch clearfix swatch-0 option1"
                        data-option-index="0"
                      >
                        <div className="product-form__item">
                          <label className="header">
                            Color:
                            <span className="slVariant">{selectedColor}</span>
                          </label>
                          <ColorItems
                            data={productData}
                            selectedColor={selectedColor}
                            change={colorChangeHandler}
                            currentSku={currentSku}
                          />
                        </div>
                      </div>
                    )}
                    {!sizeHasNone && (
                      <div
                        className="swatch clearfix swatch-1 option2"
                        data-option-index="1"
                      >
                        <div className="product-form__item">
                          <label className="header">
                            Size:
                            <span className="slVariant">{selectedSize}</span>
                          </label>
                          <SizeItems
                            data={productData}
                            selectedSize={selectedSize}
                            change={sizeChangeHandler}
                          />
                        </div>
                      </div>
                    )}
                    {actionHtml}
                  </form>
                  <div className="userViewMsg" data-user="20" data-time="11000">
                    <i className="fa fa-users" aria-hidden="true"></i>
                    <strong className="uersView">{rndInt}</strong>
                    <span>PEOPLE ARE LOOKING FOR THIS PRODUCT</span>
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
                  <div className="product-description rte">{detail}</div>
                </div>

                <div id="tab3" className="tab-content">
                  <img
                    src={require("../images/ProductDetail/tape.jpg").default}
                  />
                </div>

                <div id="tab4" className="tab-content">
                  <h4>Returns Policy</h4>
                  <p>
                    this is simply dummy text, this is simply dummy text, this
                    is simply dummy text, this is simply dummy text, this is
                    simply dummy text, this is simply dummy text, this is simply
                    dummy text, this is simply dummy text, this is simply dummy
                    text, this is simply dummy text, this is simply dummy text,
                    this is simply dummy text, this is simply dummy text.
                  </p>
                  <h4>Shipping</h4>
                  <p>
                    this is simply dummy text, this is simply dummy text, this
                    is simply dummy text, this is simply dummy text, this is
                    simply dummy text, this is simply dummy text, this is simply
                    dummy text, this is simply dummy text, this is simply dummy
                    text, this is simply dummy text, this is simply dummy text,
                    this is simply dummy text, this is simply dummy text.
                  </p>
                </div>
              </div>
            </div>
            {/*End Product Tabs*/}           
          </div>
          {/*#ProductSection-product-template*/}
        </div>
      )}
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
