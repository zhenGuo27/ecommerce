import $ from "jquery";
import * as PhotoSwipe from "photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import { Fragment, useContext, useEffect, useState } from "react";
import { getProductById } from "../actions/product-action";
import { getUserCartByUid, updateUserCart } from "../actions/user-action";
import ProductRate from "./ProductRate";
import ColorItems from "./ColorItems";
import SizeItems from "./SizeItems";
import ProductSlider from "./ProductSlider";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';
import AuthContext from "../store/auth-context";

window.jQuery = window.$ = $;
require("ez-plus");

const Product = (props) => {
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const { id } = params;

  const [userCart, setUserCart] = useState({});
  const [productData, setProduct] = useState({});
  const [currentSku, setCurrentSku] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [detail, setDetail] = useState(parse(""));
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);

  useEffect(() => {
    document.body.classList.add("template-product");
  }, []);

  useEffect(()=> {
    if(authCtx.isLoggedIn){
      getUserCartData();
    }
  }, [authCtx.isLoggedIn]);

  useEffect(() => {
    getProductById(id).then((item) => {
      setProduct(item);
      setCurrentSku(item.sku[0]);
      console.log("item", item);

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
    }
  }, [productData]);

  const getUserCartData = () => {
    getUserCartByUid(authCtx.uid).then((item) => {
      setUserCart(item);
    });
  };

  const updateCartData = (cartItem, originalData) => {
    let updatedData = originalData ? [...originalData] : [];
    const exist = updatedData.some((item) => item.productId === cartItem.productId && item.sku.id === cartItem.sku.id);
    if (exist) {
      let currentItem = updatedData.find(
        (item) => item.productId === cartItem.productId && item.sku.id === cartItem.sku.id
      );
      currentItem.quantity = orderQuantity;
    } else {
      updatedData.push(cartItem);
    }

    return updatedData;
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
      //get original cart data from backend
      //if product item exist and sku is same as current selected , update quntity else add new item 
      //post updated cart data to backend     
      const cartData = (userCart) ? userCart.cartItems : null;
      const updatedData = updateCartData(cartItem, cartData);
      const updatedUserCart = {
        uid: authCtx.uid,
        token: authCtx.token,
        cartItems: updatedData
      };

      updateUserCart(updatedUserCart);
    } else {
      let newUserCartData = {
        uid: authCtx.uid,
        token: authCtx.token,
        cartItems: null
      };
      if (!cookies.cart) {
        newUserCartData.cartItems = [cartItem];
      } else {
        newUserCartData.cartItems = updateCartData(cartItem, cookies.cart);
      }
      setCookie("cart", JSON.stringify(newUserCartData), { path: "/" });
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
          >
            Buy it now
          </button>
        </div>
      </div>
    );
  }

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
                data-src={require("../" + item).default}
                src={require("../" + item).default}
                alt={productData.title}
              />
            </a>
          );
        })}
      </div>
    );
  };

  let initImg =
    Object.keys(productData).length !== 0
      ? productData.largeImgs.filter((item) => item.detail === true)[0].src
      : "";
  initImg = initImg ? require("../" + initImg).default : "";

  return (
    <Fragment>
      {Object.keys(productData).length !== 0 && (
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
                      {Object.keys(productData).length !== 0 && (
                        <ImgGallery data={productData.largeImgs} />
                      )}
                    </div>
                    <div className="zoompro-wrap product-zoom-right pl-20">
                      <div className="zoompro-span">
                        <img
                          className="blur-up lazyload zoompro"
                          data-zoom-image={initImg}
                          alt={productData.title}
                          src={initImg}
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
                       {
                         productData.largeImgs.map((item, index)=> <a href={"../../assets/"+ item.src} data-size="1071x1500" key={`lightboxImg_${index}`}></a>)
                       }                                   
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
                    {productData.desc}
                  </div>
                  <div id="quantity_message">
                    <span className="items">{currentSku.stock}</span> left in
                    stock.
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
                          Color:{" "}
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
                    <div
                      className="swatch clearfix swatch-1 option2"
                      data-option-index="1"
                    >
                      <div className="product-form__item">
                        <label className="header">
                          Size:{" "}
                          <span className="slVariant">{selectedSize}</span>
                        </label>
                        <SizeItems
                          data={productData}
                          selectedSize={selectedSize}
                          change={sizeChangeHandler}
                        />
                      </div>
                    </div>
                    {actionHtml}
                  </form>
                  <div className="userViewMsg" data-user="20" data-time="11000">
                    <i className="fa fa-users" aria-hidden="true"></i>{" "}
                    <strong className="uersView">{productData.viewed}</strong>
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
                    <img src={require("../images/size.jpg")} alt="" />
                  </div>
                </div>

                <div id="tab4" className="tab-content">
                  <h4>Returns Policy</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Fusce eros justo, accumsan non dui sit amet. Phasellus
                    semper volutpat mi sed imperdiet. Ut odio lectus, vulputate
                    non ex non, mattis sollicitudin purus. Mauris consequat
                    justo a enim interdum, in consequat dolor accumsan. Nulla
                    iaculis diam purus, ut vehicula leo efficitur at.
                  </p>
                  <p>
                    Interdum et malesuada fames ac ante ipsum primis in
                    faucibus. In blandit nunc enim, sit amet pharetra erat
                    aliquet ac.
                  </p>
                  <h4>Shipping</h4>
                  <p>
                    Pellentesque ultrices ut sem sit amet lacinia. Sed nisi dui,
                    ultrices ut turpis pulvinar. Sed fringilla ex eget lorem
                    consectetur, consectetur blandit lacus varius. Duis vel
                    scelerisque elit, et vestibulum metus. Integer sit amet
                    tincidunt tortor. Ut lacinia ullamcorper massa, a fermentum
                    arcu vehicula ut. Ut efficitur faucibus dui Nullam tristique
                    dolor eget turpis consequat varius. Quisque a interdum
                    augue. Nam ut nibh mauris.
                  </p>
                </div>
              </div>
            </div>
            {/*End Product Tabs*/}

            <ProductSlider
              slider="relatedSlider"
              title="Related Products"
              subtitle="You can stop autoplay, increase/decrease aniamtion speed and number of grid to show and products from store admin."
            />

            <ProductSlider
              slider="recentlySlider"
              title="Recently Viewed Product"
              subtitle="You can manage this section from store admin as describe in above section"
            />
          </div>
          {/*#ProductSection-product-template*/}
        </div>
      )}

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
            <img src={require("../images/size.jpg")} alt="" />
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
