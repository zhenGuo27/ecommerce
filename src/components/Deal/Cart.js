import { Fragment, useEffect, useState, useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import { getUserCart, getUserCartByUid, updateUserCart } from "../../actions/user-action";
import { NavLink, useHistory } from "react-router-dom";
import { getProductByMutipleId } from "../../actions/product-action";

const Cart = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [userCartItems, setUserCartItems] = useState([]);
  const [subtotalPrice, setsubtotalPrice] = useState();
  const noteRef = useRef();
  const agreeRef = useRef();
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      history.replace("/");
      return;
    }
    
    setUserCartItems(authCtx.cart.cartItems);
    subtotalPriceHandler(authCtx.cart.cartItems);
    if (authCtx.cart.cartItems.length !== 0) {
      getProductsHandler(authCtx.cart.cartItems);
    }



    // getUserCartByUid(authCtx.uid, null).then((items) => {
    //   setUserCartItems(items);
    //   subtotalPriceHandler(items);
    //   if (items.length !== 0) {
    //     getProductsHandler(items);
    //   }
    // });
  }, []);

  const getProductsHandler = (cartItems) => {
    const ids = [...new Set(cartItems.map((item) => item.productId))];
    getProductByMutipleId(ids.join("_")).then((items) => {
      setProducts(items);
    });
  };

  const subtotalPriceHandler = (items) => {
    let subtotal = 0;
    items.forEach((element) => {
      subtotal += element.subtotal;
    });
    setsubtotalPrice(subtotal.toFixed(2));
  };

  const submitHandler = () => {
    const cartData = {
      uid: authCtx.uid,
      token: authCtx.token,
      cartItems: userCartItems,
      note: noteRef.current.value,
    };

    if (agreeRef.current.checked && userCartItems.length !== 0) {
      updateUserCart(cartData).then((data) => {
        if (data.returnCode !== -1) {
          history.replace("/Checkout");
        }
      });
    }
  };

  const increaseQuantity = (id, skuId, index) => {
    const pData = products.find((x) => x.id === id);
    const stock = pData.sku.find((x) => x.id === skuId).stock;
    const cData = [...userCartItems];
    if (cData[index].quantity < stock) {
      cData[index].quantity = cData[index].quantity + 1;
      cData[index].subtotal = cData[index].quantity * cData[index].unitPrice;
    }

    setUserCartItems(cData);
    subtotalPriceHandler(cData);
  };

  const decreaseQuantity = (id, skuId, index) => {
    const pData = products.find((x) => x.id === id);
    const stock = pData.sku.find((x) => x.id === skuId).stock;
    const cData = [...userCartItems];
    if (cData[index].quantity > 0 && stock > 0) {
      cData[index].quantity = cData[index].quantity - 1;
      cData[index].subtotal = cData[index].quantity * cData[index].unitPrice;
    }

    setUserCartItems(cData);
    subtotalPriceHandler(cData);
  };

  const checkAgreeCondition = (event) => {
    console.log("checkbox", event.target.checked);
    if (!event.target.checked) {
      setErrorMsg("please check condition.");
    } else {
      setErrorMsg("");
    }
  };

  const removeItem = (productId, skuId) => {
    const cData = [...userCartItems];
    const targetIndex = cData.findIndex(
      (x) => x.productId === productId && x.sku.id === skuId
    );

    cData.splice(targetIndex, 1);
    setUserCartItems(cData);
    subtotalPriceHandler(cData);
  };

  return (
    <Fragment>
      {/*Page Title*/}
      <div className="page section-header text-center">
        <div className="page-title">
          <div className="wrapper">
            <h1 className="page-width">Your cart</h1>
          </div>
        </div>
      </div>
      {/*End Page Title*/}

      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-8 col-lg-8 main-col">
            <form action="#" method="post" className="cart style2">
              <table>
                <thead className="cart__row cart__header">
                  <tr>
                    <th colSpan="2" className="text-center">
                      Product
                    </th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-right">Total</th>
                    <th className="action">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {userCartItems.map((item, index) => {
                    return (
                      <tr
                        className="cart__row border-bottom line1 cart-flex border-top"
                        key={`cartItem_${item.productId}_${item.sku.id}`}
                      >
                        <td className="cart__image-wrapper cart-flex-item">
                          <a href="#">
                            <img
                              className="cart__image"
                              src={require("../../" + item.img).default}
                              alt={item.title}
                            />
                          </a>
                        </td>
                        <td className="cart__meta small--text-left cart-flex-item">
                          <div className="list-view-item__title">
                            <a href="#">{item.title}</a>
                          </div>

                          <div className="cart__meta-text">
                            Color: {item.sku.color}
                            <br />
                            Size: {item.sku.size}
                            <br />
                          </div>
                        </td>
                        <td className="cart__price-wrapper cart-flex-item">
                          <span className="money">${item.unitPrice}</span>
                        </td>
                        <td className="cart__update-wrapper cart-flex-item text-right">
                          <div className="cart__qty text-center">
                            <div className="qtyField">
                              <a
                                className="qtyBtn minus"
                                onClick={decreaseQuantity.bind(
                                  null,
                                  item.productId,
                                  item.sku.id,
                                  index
                                )}
                              >
                                <i className="icon icon-minus"></i>
                              </a>
                              <input
                                className="cart__qty-input qty"
                                type="text"
                                name="updates[]"
                                id="qty"
                                value={item.quantity}
                                readOnly={true}
                                pattern="[0-9]*"
                              />
                              <a
                                className="qtyBtn plus"
                                onClick={increaseQuantity.bind(
                                  null,
                                  item.productId,
                                  item.sku.id,
                                  index
                                )}
                              >
                                <i className="icon icon-plus"></i>
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="text-right small--hide cart-price">
                          <div>
                            <span className="money">
                              ${item.subtotal.toFixed(2)}
                            </span>
                          </div>
                        </td>
                        <td className="text-center small--hide">
                          <a
                            href="#"
                            className="btn btn--secondary cart__remove"
                            title="Remove Item"
                            onClick={removeItem.bind(
                              item.productId,
                              item.sku.id
                            )}
                          >
                            <i className="icon icon anm anm-times-l"></i>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-left">
                      <NavLink to="/" className="btn--link cart-continue">
                        <i className="icon icon-arrow-circle-left"></i> Continue
                        shopping
                      </NavLink>
                    </td>
                    <td colSpan="3" className="text-right">
                      <button
                        type="submit"
                        name="update"
                        className="btn--link cart-update"
                      >
                        <i className="fa fa-refresh"></i> Update
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>

              <div className="currencymsg">
                We processes all orders in USD. While the content of your cart
                is currently displayed in USD, the checkout will use USD at the
                most current exchange rate.
              </div>
            </form>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 cart__footer">
            <div className="cart-note">
              <div className="solid-border">
                <h5>
                  <label
                    htmlFor="CartSpecialInstructions"
                    className="cart-note__label small--text-center"
                  >
                    Add a note to your order
                  </label>
                </h5>
                <textarea
                  name="note"
                  id="CartSpecialInstructions"
                  className="cart-note__input"
                  ref={noteRef}
                ></textarea>
              </div>
            </div>
            <div className="solid-border">
              <div className="row">
                <span className="col-12 col-sm-6 cart__subtotal-title">
                  <strong>Subtotal</strong>
                </span>
                <span className="col-12 col-sm-6 cart__subtotal-title cart__subtotal text-right">
                  <span className="money">${subtotalPrice}</span>
                </span>
              </div>
              <div className="cart__shipping">
                Shipping &amp; taxes calculated at checkout
              </div>
              <p className="cart_tearm">
                <label>
                  <input
                    type="checkbox"
                    name="tearm"
                    id="cartTearm"
                    className="checkbox"
                    ref={agreeRef}
                    onChange={checkAgreeCondition}
                  />
                  I agree with the terms and conditions
                </label>
                {errorMsg && <div className="text-danger">{errorMsg}</div>}
              </p>
              <input
                type="button"
                name="checkout"
                id="cartCheckout"
                className="btn btn--small-wide checkout"
                value="Checkout"
                onClick={submitHandler}
              />
              <div className="paymnet-img">
                <img src="assets/images/payment-img.jpg" alt="Payment" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
