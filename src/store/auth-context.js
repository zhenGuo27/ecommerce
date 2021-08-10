import React, { useEffect, useState } from "react";

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

  let initalToken;
  let initUid;
  if (tokenData) {
    initUid = tokenData.uid;
    initalToken = tokenData.token;
  }

  const [uid, setUid] = useState(initUid);
  const [token, setToken] = useState(initalToken);
  //const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("uid");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const loginHandler = (uid, token, expirationTime) => {
    setUid(uid);
    setToken(token);
    localStorage.setItem("uid", uid);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);

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
