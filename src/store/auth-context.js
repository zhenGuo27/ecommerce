import $ from "jquery";
import "bootstrap";
import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";
import { hostPath } from "../actions/sharedConst";
import { getUserCartByUid, updateUserCart } from "../actions/user-action";

let logoutTimer;
const emptyUserCart = {
  uid: "",
  token: "",
  cartItems: []
};

const AuthContext = React.createContext({
  uid: "",
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  updateCartData: ()=> {},
  cart: emptyUserCart
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpireationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpireationTime - currentTime;
  return remainingDuration;
};

const retrieveStoreToken = () => {
  const storedUid = localStorage.getItem("uid");
  const storedToken = localStorage.getItem("token");
  const storedExpireationDate = localStorage.getItem("expirationTime");
  let storedUserCart = localStorage.getItem("userCart");
  storedUserCart = storedUserCart ? JSON.parse(storedUserCart) : null;

  const remainingTime = calculateRemainingTime(storedExpireationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("uid");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userCart");
    return null;
  }

  return {   
    uid: storedUid,
    token: storedToken,
    duration: remainingTime,
    cart: storedUserCart
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoreToken();
  const history = useHistory();

  let initalToken;
  let initUid;
  let intitCart = emptyUserCart;
  if (tokenData) {
    initUid = tokenData.uid;
    initalToken = tokenData.token;
    intitCart = tokenData.cart;
  }

  const [uid, setUid] = useState(initUid);
  const [token, setToken] = useState(initalToken);
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);
  const [userCart, setUserCart] = useState(intitCart); 

  const logoutHandler = () => {
    setUid("");
    setToken(null);
    setUserCart(emptyUserCart);
    localStorage.removeItem("uid");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userCart");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    history.replace(hostPath +"/");
  };

  const loginHandler = (uid, token, expirationTime) => {
    setUid(uid);
    setToken(token);

    localStorage.setItem("uid", uid);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
    checkUserCart(uid, token);
  };

  const updateCartDataHandler = (updatedUserCart, showModal) => {
    setUserCart(updatedUserCart);
    localStorage.setItem("userCart", JSON.stringify(updatedUserCart));
    if (showModal) {
      $("#cartModal").modal("show");
    }
  };

  const checkUserCart = (userUid, userToken) => {
    let newCartItem = [];
    if (cookies.cart) {
      cookies.cart.cartItems.forEach((element) => {
        newCartItem.push(element);
      });
      removeCookie("cart");
    }

    if (!userToken) {
      const newUserCartData = {
        uid: "",
        token: "",
        cartItems: newCartItem,
      };
      setUserCart(newUserCartData);
      localStorage.setItem("userCart", newUserCartData);
      return;
    }

    getUserCartByUid(userUid).then((item) => {
      if (item) {
        if (newCartItem.length === 0) {
          newCartItem = [...item.cartItems];
        }

        newCartItem.forEach((element) => {
          const exist = item.cartItems.some((cItem) => cItem.productId === element.productId && cItem.sku.id === element.sku.id);
          if (!exist) {
            newCartItem.push(element);
          } else {
            const nIndex = newCartItem.findIndex(x=> x.productId === element.productId && x.sku.id === element.sku.id);
            const cIndex = item.cartItems.findIndex(x=> x.productId === element.productId && x.sku.id === element.sku.id);

            newCartItem[nIndex].unitPrice = item.cartItems[cIndex].unitPrice;
            newCartItem[nIndex].quantity = item.cartItems[cIndex].quantity;
            newCartItem[nIndex].subtotal = item.cartItems[cIndex].quantity * item.cartItems[cIndex].unitPrice;
          }
        });
      }

      const newUserCartData = {
        uid: userUid,
        token: userToken,
        cartItems: newCartItem,
      };
      updateUserCart(newUserCartData);
      setUserCart(newUserCartData);
      localStorage.setItem("userCart", JSON.stringify(newUserCartData));
    });
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    uid: uid,
    token: token,
    isLoggedIn: !!token,
    login: loginHandler,
    logout: logoutHandler,
    updateCartData: updateCartDataHandler,
    cart: userCart
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
