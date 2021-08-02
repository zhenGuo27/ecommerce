import "bootstrap";
import { Fragment, useEffect, useState } from "react";
import { getProductById } from "./product-action";
import ColorItems from "./ColorItems";
import SizeItems from "./SizeItems";

const QuickViewPopup = (props) => {
  const [product, setProduct] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [currentSku, setCurrentSku] = useState({});
  const [orderQuantity, setOrderQuantity] = useState(1);

  useState(() => {
    console.log("props.id", props.id)
    getProductById(props.id).then((item) => {
      setProduct(item);
      setCurrentSku(item.sku[0]);
      setSelectedColor(item.sku[0].color);
      setSelectedSize(item.sku[0].size);
    });
  }, [props.id]);

  useEffect(() => {
    if (Object.keys(product).length !== 0) {
      const updatedCurrentSku = product.sku.find(
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
    updatedQuantiy =
      currentSku.stock > updatedQuantiy ? updatedQuantiy + 1 : updatedQuantiy;
    setOrderQuantity(updatedQuantiy);
  };

  const decreaseQuantity = () => {
    let updatedQuantiy = orderQuantity;
    updatedQuantiy = updatedQuantiy !== 1 ? updatedQuantiy - 1 : updatedQuantiy;
    setOrderQuantity(updatedQuantiy);
  };

  let price;
  if (currentSku && currentSku.discount === 1) {
    price = (
      <Fragment>
        <span className="visually-hidden">Regular price</span>
        <s id="ComparePrice-product-template">
          <span className="money">${currentSku.originalPrice}</span>
        </s>
      </Fragment>
    );
  }

  if (currentSku && currentSku.discount !== 1) {
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

  const sizeChangeHandler = (size) => {
    setSelectedSize(size);
  };

  return (
    <div
      className="modal fade quick-view-popup"
      id="content_quickview"
      data-backdrop="static"
    >
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
                {Object.keys(product).length !== 0 && currentSku && (
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="product-details-img">
                        <div className="pl-20">
                          <img
                            src={product.largeImgs[0].src}
                            alt={product.title}
                          />
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
                            {currentSku.stock !== 0 && (
                              <span className="instock ">In Stock</span>
                            )}
                            {currentSku.stock === 0 && (
                              <span className="outstock">Unavailable</span>
                            )}
                          </div>
                          <div className="product-sku">
                            SKU:
                            <span className="variant-sku">{product.id}</span>
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
                                Color:{" "}
                                <span className="slVariant">
                                  {selectedColor}
                                </span>
                              </label>
                              <ColorItems
                                data={product}
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
                                <span className="slVariant">
                                  {selectedSize}
                                </span>
                              </label>
                              <SizeItems
                                data={product}
                                selectedSize={selectedSize}
                                change={sizeChangeHandler}
                              />
                            </div>
                          </div>
                          {/* Product Action */}
                          <div className="product-action clearfix">
                            <div className="product-form__item--quantity">
                              <div className="wrapQtyBtn">
                                <div className="qtyField">
                                  <a
                                    className="qtyBtn minus"
                                    onClick={decreaseQuantity}
                                  >
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
                                  <a
                                    className="qtyBtn plus"
                                    onClick={increaseQuantity}
                                  >
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
                )}
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
