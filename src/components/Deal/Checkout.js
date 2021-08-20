import $ from "jquery";
import { Fragment, useState, useContext, useRef, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import {
  checkEmail,
  isNumeric,
  insertBill
} from "../../actions/user-action";
import { useHistory } from "react-router-dom";

const initBillDetail =  Array(7).join(".").split(".");
const initCreditCard = Array(3).join(".").split(".");
const shippingFee = 50;

const Checkout = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [userCartItems, setUserCartItems] = useState([]);
  const [subtotalPrice, setsubtotalPrice] = useState();
  const detailRef = useRef(initBillDetail);
  const creditCardRef = useRef(initCreditCard);
  const [msg, setMsg] = useState("");
  const [selectedPaymentMethod, setselectedPaymentMethod] = useState("1");

  useEffect(()=> {
     setUserCartItems(authCtx.cart.cartItems);
     subtotalPriceHandler(authCtx.cart.cartItems);
  }, []);

  const subtotalPriceHandler = (items) => {
    let subtotal = 0;
    items.forEach((element) => {
      subtotal += element.subtotal;
    });
    setsubtotalPrice(subtotal);
  };

  const checkDataHandler = (data)=> {
    if (
      data.firstName.trim().length === 0 ||
      data.lastName.trim().length === 0 ||
      data.email.trim().length === 0 ||
      data.tel.trim().length === 0 ||
      data.address.trim().length === 0
    ) {
      return "please check your bill detail";
    }

    if(!checkEmail(data.email)) {
      return "email is not valid."
    }

    if(!isNumeric(data.tel)){
      return "tel must be number.";
    }

    if(data.tel.length !==10){
      return "tel length must be 10.";
    }

    if (selectedPaymentMethod === "2") {
      if (
        creditCardRef.current[0].value === "" ||
        creditCardRef.current[1].value === "" ||
        creditCardRef.current[2].value === ""
      ) {
        return "please check your credit card info";
      }
      const cardExpiredDate = new Date(creditCardRef.current[2].value);
      const today = new Date();
      if (today.getTime() > cardExpiredDate.getTime()) {
        return "Card is expired";
      }

      if(creditCardRef.current[0].value.trim().length!=16){
        return "please check your credit card number";
      }

      if(creditCardRef.current[1].value.trim().length !=3){
        return "please check your CVV code";
      }
    }

    return "";
  }

  const submitHandler = () => {
    let submitData = {
      uid: authCtx.uid,
      subtotalFee: subtotalPrice,
      shippingFee: shippingFee,
      totalFee: (subtotalPrice + shippingFee),
      firstName: detailRef.current[0].value,
      lastName: detailRef.current[1].value,
      email: detailRef.current[2].value,
      tel: detailRef.current[3].value,
      company: detailRef.current[4].value,
      address: detailRef.current[5].value,
      note: detailRef.current[6].value,
      products: JSON.stringify(userCartItems),
      paymentMethod: selectedPaymentMethod
    };

    const errorMsg = checkDataHandler(submitData);
    if (errorMsg !== "") {
      setMsg(errorMsg);
    } else {
      setMsg("");
      const updatedUserCart = {
        uid: authCtx.uid,
        token: authCtx.token,
        cartItems: []
      };
      insertBill(submitData, authCtx.updateCartData, updatedUserCart).then((data)=> {
        if (data.returnCode === 0) {
          $("#submitModal").modal("show");
        } else {
          setMsg(data.content);
        }
      });
    }
  };

  const submitBtnHandler = () => {
    $("#submitModal").modal("hide");
    history.replace("/");
  };

  const paymentMethodChangeHandler = (event) => {
     setselectedPaymentMethod(event.target.value);
  };

  const bankTransferText = (
    <div className="bankTransferText card mb-2">
      <div>
        <div className="card-body">
          <p className="no-margin font-15">
            Make your payment directly into our bank account. Please use your
            Order ID as the payment reference. Your order won't be shipped until
            the funds have cleared in our account.
          </p>
        </div>
      </div>
    </div>
  );

const creditCardText = (
  <div className="creditCardText card mb-2">
    <div>
      <div className="card-body">
        <fieldset>
          <div className="row">
            <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
              <label htmlFor="input-cardno">
                Credit Card Number
                <span className="required-f">*</span>
              </label>
              <input
                name="cardno"
                placeholder="Credit Card Number"
                id="input-cardno"
                className="form-control"
                type="text"
                ref={(el) => (creditCardRef.current[0] = el)}
                />
            </div>
            <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
              <label htmlFor="input-cvv">
                CVV Code
                <span className="required-f">*</span>
              </label>
              <input
                name="cvv"
                placeholder="Card Verification Number"
                id="input-cvv"
                className="form-control"
                type="text"
                ref={(el) => (creditCardRef.current[1] = el)}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
              <label>
                Expiration Date
                <span className="required-f">*</span>
              </label>
              <input type="date" name="exdate" className="form-control" ref={(el) => (creditCardRef.current[2] = el)}/>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
);

  return (
    <Fragment>
      {/*Page Title*/}
      <div className="page section-header text-center">
        <div className="page-title">
          <div className="wrapper">
            <h1 className="page-width">Checkout</h1>
          </div>
        </div>
      </div>
      {/*End Page Title*/}

      <div className="container">
        <div className="row billing-fields">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 sm-margin-30px-bottom">
            <div className="create-ac-content bg-light-gray padding-20px-all">
              <form>
                <fieldset>
                  <h2 className="login-title mb-3">Billing details</h2>
                  <div className="row">
                    <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                      <label htmlFor="input-firstname">
                        First Name <span className="required-f">*</span>
                      </label>
                      <input
                        name="firstname"
                        id="input-firstname"
                        type="text"
                        ref={(el) => (detailRef.current[0] = el)}
                      />
                    </div>
                    <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                      <label htmlFor="input-lastname">
                        Last Name <span className="required-f">*</span>
                      </label>
                      <input
                        name="lastname"
                        id="input-lastname"
                        type="text"
                        ref={(el) => (detailRef.current[1] = el)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                      <label htmlFor="input-email">
                        E-Mail <span className="required-f">*</span>
                      </label>
                      <input
                        name="email"
                        id="input-email"
                        type="email"
                        ref={(el) => (detailRef.current[2] = el)}
                      />
                    </div>
                    <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                      <label htmlFor="input-telephone">
                        Telephone <span className="required-f">*</span>
                      </label>
                      <input
                        name="telephone"
                        id="input-telephone"
                        type="tel"
                        ref={(el) => (detailRef.current[3] = el)}
                      />
                    </div>
                  </div>
                </fieldset>

                <fieldset>
                  <div className="row">
                    <div className="form-group col-md-6 col-lg-6 col-xl-6">
                      <label htmlFor="input-company">Company</label>
                      <input
                        name="company"
                        id="input-company"
                        type="text"
                        ref={(el) => (detailRef.current[4] = el)}
                      />
                    </div>
                    <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                      <label htmlFor="input-address-1">
                        Address <span className="required-f">*</span>
                      </label>
                      <input
                        name="address_1"
                        id="input-address-1"
                        type="text"
                        ref={(el) => (detailRef.current[5] = el)}
                      />
                    </div>
                  </div>
                </fieldset>

                <fieldset>
                  <div className="row">
                    <div className="form-group col-md-12 col-lg-12 col-xl-12">
                      <label htmlFor="input-company">
                        Order Notes
                      </label>
                      <textarea
                        className="form-control resize-both"
                        rows="3"
                        ref={(el) => (detailRef.current[6] = el)}
                      ></textarea>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="your-order-payment">
              <div className="your-order">
                <h2 className="order-title mb-4">Your Order</h2>

                <div className="table-responsive-sm order-table">
                  <table className="bg-white table table-bordered table-hover text-center">
                    <thead>
                      <tr>
                        <th className="text-left">Product Name</th>
                        <th>Price</th>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userCartItems.map((item) => {
                        return (
                          <tr key={`cartItem_${item.title}${item.sku.id}`}>
                            <td className="text-left">{item.title}</td>
                            <td>${item.unitPrice}</td>
                            <td>{item.sku.size}</td>
                            <td>{item.sku.color}</td>
                            <td>{item.quantity}</td>
                            <td>${item.subtotal.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="font-weight-600">
                      <tr>
                        <td colSpan="5" className="text-right">
                          Shipping
                        </td>
                        <td>${shippingFee.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td colSpan="5" className="text-right">
                          Total
                        </td>
                        <td>${(subtotalPrice + shippingFee).toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <hr />

              <div className="your-payment">
                <h2 className="payment-title mb-3">payment method</h2>
                <div className="form-group">
                  <select
                    name="paymentMethod"
                    className="form-control"
                    onChange={paymentMethodChangeHandler}
                  >
                  <option value="1">Direct bank transfer</option>
                  <option value="2">Credit Card</option>               
                  </select>
                </div>
                <div className="payment-method">
                  <div className="payment-accordion">
                    <div className="payment-section">
                      {selectedPaymentMethod === "1" && bankTransferText}
                      {selectedPaymentMethod === "2" && creditCardText}
                    </div>
                  </div>
                  {msg && <p className="text-danger">{msg}</p>}
                  <div className="order-button-payment">
                    <button
                      className="btn"
                      value="Place order"
                      type="button"
                      onClick={submitHandler}
                    >
                      Place order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="submitModal" className="modal" tabIndex="-1" role="dialog" data-backdrop="static">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Submit</h5>
            </div>
            <div className="modal-body">
              <p>Submit sucessfully !!!</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={submitBtnHandler}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Checkout;
