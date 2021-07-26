import "bootstrap";
import { Fragment, useEffect, useState } from "react";

const QuickViewPopup = (props) => {
  const [selectedColor, setSelectedColor] = useState(
    Object.keys(props.data).length !== 0 ? props.data.sku[0].color : ""
  );
  const [selectedSize, setSelectedSize] = useState(
    Object.keys(props.data).length !== 0 ? props.data.sku[0].size : ""
  );
  const [currentSku, setCurrentSku] = useState({});
  const [orderQuantity, setOrderQuantity] = useState(1);

  useEffect(() => {
    if (Object.keys(props.data).length !== 0) {
      const updatedCurrentSku = props.data.sku.find(
        (x) => x.color === selectedColor && x.size === selectedSize
      );
      setCurrentSku(updatedCurrentSku);
    }
  }, [selectedColor, selectedSize]);

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

  let price;
  if (currentSku.discount === 1) {
    price = (
      <Fragment>
        <span className="visually-hidden">Regular price</span>
        <s id="ComparePrice-product-template">
          <span className="money">${currentSku.originalPrice}</span>
        </s>
      </Fragment>
    );
  }

  if (currentSku.discount !== 1) {
    price = (
      <Fragment>
        <span className="visually-hidden">Regular price</span>
        <s id="ComparePrice-product-template">
          <span className="money">${currentSku.originalPrice}</span>
        </s>
        <span className="product-price__price product-price__price-product-template product-price__sale product-price__sale--single">
          <span id="ProductPrice-product-template">
            <span className="money">
              ${(currentSku.originalPrice * currentSku.discount).toFixed(2)}
            </span>
          </span>
        </span>
      </Fragment>
    );
  }

  const colorChangeHandler = (color) => {
    setSelectedColor(color);
  };

  const productColors =
    Object.keys(props.data).length !== 0
      ? [...new Set(props.data.sku.map((item) => item.color))]
      : [];

  const ColorItem = (props) => {
    const available = props.available ? "available" : "";
    const classes = ` swatch-element color ${props.value
      .toString()
      .toLowerCase()} ${available}`;
    const sku = props.skus.filter((item) => item.color === props.value);
    const img = props.smallImgs.filter(
      (item) => item.skuId === sku[0].id
    )[0].src;
    const checked = (props.value === selectedColor);

    return (
      <div data-value={props.value} className={classes} onClick={colorChangeHandler.bind(null, props.value)}>
        <input
          className="swatchInput"
          id={`swatch-0-${props.value.toLowerCase()}`}
          type="radio"
          name="option-0"
          value={props.value}
          defaultChecked={checked}
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

  const sizeChangeHandler = (size) => {
    setSelectedSize(size);
  };

  const productSize =
    Object.keys(props.data).length !== 0
      ? [...new Set(props.data.sku.map((item) => item.size))]
      : [];

  const SizeItem = (props) => {
    const checked = (props.value === selectedSize);

    return (
      <div data-value={props.value} className={`swatch-element ${props.value.toLowerCase()} available`} onClick={sizeChangeHandler.bind(null, props.value)}>
        <input
          className="swatchInput"
          id={`swatch-1-${props.value.toLowerCase()}`}
          type="radio"
          name="option-1"
          value={props.value}
          defaultChecked={checked}
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
    <div className="modal fade quick-view-popup" id="content_quickview" data-backdrop="static">
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
                  onClick={props.onClose}
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
                        <img src={props.data.largeImgs[0].src} alt={props.data.title} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="product-single__meta">
                      <h2 className="product-single__title">
                        {props.data.title}
                      </h2>
                      <div className="prInfoRow">
                        <div className="product-stock">
                          {currentSku.stock !== 0 && (
                            <span className="instock ">In Stock</span>
                          )}
                          {currentSku.stock === 0 && (
                            <span className="outstock hide">Unavailable</span>
                          )}
                        </div>
                        <div className="product-sku">
                          SKU:
                          <span className="variant-sku">{props.data.id}</span>
                        </div>
                      </div>
                      <p className="product-single__price product-single__price-product-template">
                        {price}
                      </p>
                      <div className="product-single__description rte">
                        {props.data.desc}
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
                            {productColors.map((item) => (
                              <ColorItem
                                key={item}
                                value={item}
                                available={currentSku.stock !== 0}
                                skus={props.data.sku}
                                smallImgs={props.data.smallImgs}
                              />
                            ))}
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
                            {productSize.map((item) => (
                              <SizeItem key={item} value={item} />
                            ))}
                          </div>
                        </div>
                        {/* Product Action */}
                        <div className="product-action clearfix">
                          <div className="product-form__item--quantity">
                            <div className="wrapQtyBtn">
                              <div className="qtyField">
                                <a className="qtyBtn minus" onClick={decreaseQuantity}>
                                  <i
                                    className="fa anm anm-minus-r"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                                <input
                                  type="text"
                                  id="Quantity"
                                  name="quantity"
                                  value={orderQuantity}
                                  className="product-form__input qty"
                                  onChange={orderQuantityChangeHandler}
                                />
                                <a className="qtyBtn plus" onClick={increaseQuantity}>
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
