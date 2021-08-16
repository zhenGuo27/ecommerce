import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";
import { getUserCartByUid, updateUserCart } from "../actions/user-action";

let logoutTimer;

const AuthContext = React.createContext({
  uid: "",
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
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

  const remainingTime = calculateRemainingTime(storedExpireationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("uid");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {   
    uid: storedUid,
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoreToken();
  const history = useHistory();

  let initalToken;
  let initUid;
  if (tokenData) {
    initUid = tokenData.uid;
    initalToken = tokenData.token;
  }

  const [uid, setUid] = useState(initUid);
  const [token, setToken] = useState(initalToken);
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);

  const logoutHandler = () => {
    setUid("");
    setToken(null);
    localStorage.removeItem("uid");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    history.replace("/");
  };

  const loginHandler = (uid, token, expirationTime) => {
    setUid(uid);
    setToken(token);
    localStorage.setItem("uid", uid);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
    checkCartCookie(uid, token);
  };

  const checkCartCookie = (userUid, userToken) => {
    if (cookies.cart) {
      getUserCartByUid(userUid).then((item) => {
        const newCartItem = [...item.cartItems];

        if (item) {
          cookies.cart.cartItems.forEach((element) => {
            const exist = item.cartItems.some((cItem) => cItem.productId === element.productId && cItem.sku.id === element.sku.id);
            if (!exist) {
              newCartItem.push(element);
            } else {
              const eIndex = newCartItem.findIndex(x=> x.productId === element.productId && x.sku.id === element.sku.id);
              newCartItem[eIndex].unitPrice = element.unitPrice;
              newCartItem[eIndex].quantity = element.quantity;
              newCartItem[eIndex].subtotal = element.quantity * element.unitPrice;
            }
          });

          const updatedUserCart = {
            uid: userUid,
            token: userToken,
            cartItems: newCartItem,
          };
          updateUserCart(updatedUserCart);
          removeCookie("cart");
        }
      });
    }
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
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
