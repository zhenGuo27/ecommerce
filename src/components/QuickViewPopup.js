import 'bootstrap';
import { Fragment } from "react";
import cameliaReversibleBig1 from "../images/product-detail-page/camelia-reversible-big1.jpg";
import product7 from "../images/product-images/product-image7.jpg";
import product7_1 from "../images/product-images/product-image7-1.jpg";
import prodcutImg_red from "../images/product-detail-page/variant1-1.jpg";
import prodcutImg_green from "../images/product-detail-page/variant1-3.jpg";
import prodcutImg_gray from "../images/product-detail-page/variant1-4.jpg";


const QuickViewPopup = (props) => {
  const selectedColor = "Red";
  const selectedSize = "XS";

  const product =   {
    id: "clothing-1",
    title: "Clothing-2 product",
    desc: "Belle is a minimalist modern eCommerce Html Template that will give you and your customers a smooth shopping experience which can be used for various kinds of stores such as fashion,...",
    tagId: 1,
    startDate: "2021-07-14",
    rate: 1,
  };

  const productImg = {
    productId: "clothing-1",
    largeImg: [
      {
        src: product7,
        homeSlider: true,
        homeSliderHover: false,
        skuId: null
      },
      {
        src: product7_1,
        homeSlider: true,
        homeSliderHover: true,
        skuId: null
      },
    ],
    smallImg: [
      {
        src: prodcutImg_red,
        homeSlider: false,
        homeSliderHover: false,
        skuId: 1,       
      },
      {
        src: prodcutImg_red,
        homeSlider: false,
        homeSliderHover: false,
        skuId: 2,       
      },
      {
        src: prodcutImg_red,
        homeSlider: false,
        homeSliderHover: false,
        skuId: 3,       
      },
      {
        src: prodcutImg_red,
        homeSlider: false,
        homeSliderHover: false,
        skuId: 4,       
      },
      {
        src: prodcutImg_green,
        homeSlider: false,
        homeSliderHover: false,
        skuId: 5,       
      },
      {
        src: prodcutImg_green,
        homeSlider: false,
        homeSliderHover: false,
        skuId: 6,       
      },
      {
        src: prodcutImg_green,
        homeSlider: false,
        homeSliderHover: false,
        skuId: 7,       
      },
      {
        src: prodcutImg_green,
        homeSlider: false,
        homeSliderHover: false,
        skuId: 8,       
      },
      {
        src: prodcutImg_gray,
        homeSlider: false,
        homeSliderHover: false,
        skuId: 9,       
      },
      {
        src: prodcutImg_gray,
        homeSlider: false,
        homeSliderHover: false,
        skuId: 10,       
      },
      {
        src: prodcutImg_gray,
        homeSlider: false,
        homeSliderHover: false,
        skuId: 11,       
      },
      {
        src: prodcutImg_gray,
        homeSlider: false,
        homeSliderHover: false,
        skuId: 12,       
      } 
    ]
  };

  const product_sku = [
    {
      id: 1,
      productId: "clothing-1",
      color: "Red",
      size: "XS",
      originalPrice: 280.68,
      discount: 0.8,
      stock: 100,
    },
    {
      id: 2,
      productId: "clothing-1",
      color: "Red",
      size: "S",
      originalPrice: 280.68,
      discount: 0.8,
      stock: 100,
    },
    {
      id: 3,
      productId: "clothing-1",
      color: "Red",
      size: "M",
      originalPrice: 280.68,
      discount: 0.8,
      stock: 100,
    },
    {
      id: 4,
      productId: "clothing-1",
      color: "Red",
      size: "L",
      originalPrice: 280.68,
      discount: 0.8,
      stock: 100,
    },
    {
      id: 5,
      productId: "clothing-1",
      color: "Green",
      size: "XS",
      originalPrice: 280.68,
      discount: 0.8,
      stock: 100,
    },
    {
      id: 6,
      productId: "clothing-1",
      color: "Green",
      size: "S",
      originalPrice: 280.68,
      discount: 0.8,
      stock: 100,
    },
    {
      id: 7,
      productId: "clothing-1",
      color: "Green",
      size: "M",
      originalPrice: 280.68,
      discount: 0.8,
      stock: 100,
    },
    {
      id: 8,
      productId: "clothing-1",
      color: "Green",
      size: "L",
      originalPrice: 280.68,
      discount: 0.8,
      stock: 100,
    },
    {
      id: 9,
      productId: "clothing-1",
      color: "Gray",
      size: "XS",
      originalPrice: 280.68,
      discount: 0.8,
      stock: 100,
    },
    {
      id: 10,
      productId: "clothing-1",
      color: "Gray",
      size: "S",
      originalPrice: 280.68,
      discount: 0.8,
      stock: 100,
    },
    {
      id: 11,
      productId: "clothing-1",
      color: "Gray",
      size: "M",
      originalPrice: 280.68,
      discount: 0.8,
      stock: 100,
    },
    {
      id: 12,
      productId: "clothing-1",
      color: "Gray",
      size: "L",
      originalPrice: 280.68,
      discount: 0.8,
      stock: 100,
    },
  ];

  const inputOnChangeHandler = () => {};

  let price;
  const currentSku =  product_sku.filter(
    (item) => item.color === selectedColor && item.size === selectedSize
  )[0];

  if(currentSku.discount === 1) {
    price = <Fragment>
              <span className="visually-hidden">Regular price</span>
              <s id="ComparePrice-product-template">
                <span className="money">${currentSku.originalPrice}</span>
              </s>
            </Fragment>;
  }

  if(currentSku.discount !== 1) {
    price = <Fragment>
              <span className="visually-hidden">Regular price</span>
              <s id="ComparePrice-product-template">
                <span className="money">${currentSku.originalPrice}</span>
              </s>
              <span className="product-price__price product-price__price-product-template product-price__sale product-price__sale--single">
                <span id="ProductPrice-product-template">                 
                  <span className="money">${(currentSku.originalPrice * currentSku.discount).toFixed(2)}</span>
                </span>
              </span>
            </Fragment>;
  }

  const productColors = [...new Set(product_sku.map(item => item.color))];

  const ColorItem = (props) => {
    const available = (props.available) ? "available" : "";
    const classes = ` swatch-element color ${props.value.toString().toLowerCase()} ${available}`;
    const sku = product_sku.filter((item)=> item.color === props.value);
    const img = productImg.smallImg.filter((item)=> item.skuId === sku[0].id)[0].src;

    return (
      <div data-value={props.value} className={classes}>
        <input
          className="swatchInput"
          id={`swatch-0-${props.value.toLowerCase()}`}
          type="radio"
          name="option-0"
          value={props.value}
          onChange={inputOnChangeHandler}
        />
        <label
          className="swatchLbl color medium rectangle"
          htmlFor={`swatch-0-${props.value.toString().toLowerCase()}`}
          style={{
            backgroundImage: "url(" + img + ")",
          }}
          title={props.value}
        ></label>
      </div>
    );
  };

  const productSize = [...new Set(product_sku.map(item => item.size))]; 

  const SizeItem = (props) => {
    return (
      <div data-value={props.value} className="swatch-element xs available">
        <input
          className="swatchInput"
          id={`swatch-1-${props.value.toLowerCase()}`}
          type="radio"
          name="option-1"
          value={props.value}
          onChange={inputOnChangeHandler}
        />
        <label
          className="swatchLbl medium rectangle"
          htmlFor={`swatch-1-${props.value.toLowerCase()}`}
          title={props.value}
        >
          {props.value}
        </label>
      </div>
    );
  };

  return (
    <div className="modal fade quick-view-popup" id="content_quickview">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <div
              id="ProductSection-product-template"
              className="product-template__container prstyle1"
            >
              <div className="product-single">
                {/* Start model close */}
                <a
                  href="#"
                  data-dismiss="modal"
                  className="model-close-btn pull-right"
                  title="close"
                >
                  <span className="icon icon anm anm-times-l"></span>
                </a>
                {/* End model close */}
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="product-details-img">
                      <div className="pl-20">
                        <img src={cameliaReversibleBig1} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="product-single__meta">
                      <h2 className="product-single__title">
                        {product.title}
                      </h2>
                      <div className="prInfoRow">
                        <div className="product-stock">
                          {product.stock !== 0 && <span className="instock ">In Stock</span>}
                          {product.stock === 0 && <span className="outstock hide">Unavailable</span>}
                        </div>
                        <div className="product-sku">
                          SKU: <span className="variant-sku">{product.id}</span>
                        </div>
                      </div>
                      <p className="product-single__price product-single__price-product-template">                     
                        {price}
                      </p>
                      <div className="product-single__description rte">
                        {product.desc}
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
                              Color: <span className="slVariant">Red</span>
                            </label>
                            {
                              productColors.map((item)=> 
                                <ColorItem key={item} value={item} available={true} />                              
                              )
                            }                                                    
                          </div>
                        </div>
                        <div
                          className="swatch clearfix swatch-1 option2"
                          data-option-index="1"
                        >
                          <div className="product-form__item">
                            <label className="header">
                              Size: <span className="slVariant">XS</span>
                            </label>
                            {productSize.map((item)=> <SizeItem key={item} value={item}/>)}                                                    
                          </div>
                        </div>
                        {/* Product Action */}
                        <div className="product-action clearfix">
                          <div className="product-form__item--quantity">
                            <div className="wrapQtyBtn">
                              <div className="qtyField">
                                <a className="qtyBtn minus" href="#">
                                  <i
                                    className="fa anm anm-minus-r"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                                <input
                                  type="text"
                                  id="Quantity"
                                  name="quantity"
                                  value="1"
                                  className="product-form__input qty"
                                  onChange={inputOnChangeHandler}
                                />
                                <a className="qtyBtn plus" href="#">
                                  <i
                                    className="fa anm anm-plus-r"
                                    aria-hidden="true"
                                  ></i>
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
                        </div>
                        {/* End Product Action */}
                      </form>
                    </div>
                  </div>
                </div>
                {/*End-product-single*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewPopup;
