import { Fragment, useEffect, useState, useContext, useCallback, useRef } from "react";
import AuthContext from "../store/auth-context";
import { useCookies } from 'react-cookie';
import { getUserCartItems } from "../actions/user-action";
import { Link, NavLink } from "react-router-dom";

const Cart = (props) => {
  const authCtx = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);
  const [userCartItems, setUserCartItems] = useState([]);
  const [subtotalPrice, setsubtotalPrice] = useState();
  const noteRef = useRef();

  useEffect(()=> {
    getUserCartItems(authCtx.uid, cookies.cart).then((items) => {
      setUserCartItems(items);
      subtotalPriceHandler(items);
      console.log("Cart", items);
    });
  }, []);

  const subtotalPriceHandler = (items) => {
    let subtotal = 0;
    items.forEach((element) => {
      subtotal += element.subtotal;
    });
    setsubtotalPrice(subtotal);
  };

  const submitHandler = () => {
    //event.preventDefault();
    const cartData = {
      uid: authCtx.uid,
      token: authCtx.token,
      cartItems: userCartItems,
      note: noteRef.current.value
    };
    
    console.log("submit cart data", cartData);
  };

  const testHandler = () => {};

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
                  {userCartItems.map((item) => {
                    return (
                      <tr className="cart__row border-bottom line1 cart-flex border-top" key={`cartItem_${item.productId}_${item.sku.id}`}>
                        <td className="cart__image-wrapper cart-flex-item">
                          <a href="#">
                            <img
                              className="cart__image"
                              src={require("../" + item.img).default}
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
                              <a className="qtyBtn minus">
                                <i className="icon icon-minus"></i>
                              </a>
                              <input
                                className="cart__qty-input qty"
                                type="text"
                                name="updates[]"
                                id="qty"
                                value={item.quantity}
                                onChange={testHandler}
                                pattern="[0-9]*"
                              />
                              <a className="qtyBtn plus">
                                <i className="icon icon-plus"></i>
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="text-right small--hide cart-price">
                          <div>
                            <span className="money">${item.subtotal}</span>
                          </div>
                        </td>
                        <td className="text-center small--hide">
                          <a
                            href="#"
                            className="btn btn--secondary cart__remove"
                            title="Remove tem"
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
                        <i className="icon icon-arrow-circle-left"></i> Continue shopping
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
                    value="tearm"
                    onChange={testHandler}
                    required=""
                  />
                  I agree with the terms and conditions
                </label>
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
