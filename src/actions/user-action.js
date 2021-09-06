import { backendUrl } from "./sharedConst";

export const getUserCartByUid = async (uid) => {
  const response = await fetch(
    backendUrl + "/Api/values/GetCartByUid?" +
      new URLSearchParams({
        uid: uid,
      })
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await response.json();

  if (data.returnCode === -1) {
    return null;
  } else {
    const reqItems = JSON.parse(data.content);
    return reqItems;
  }
};

export const updateUserCart = async (cart) => {
  const response = await fetch(
    backendUrl + "/Api/values/UpdateCartByUser",
    {
      method: "POST",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await response.json();

  return data;
};

export const checkEmail = (email)=> {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isNumeric = (str) => {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))// ...and ensure strings of whitespace fail
  ); 
};

export const insertBill = async (bill, updateCartFn, updatedUserCart) => {
  const response = await fetch(
    backendUrl + "/Api/values/InsertBill",
    {
      method: "POST",
      body: JSON.stringify(bill),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await response.json();
  
  if (data.returnCode !== -1) {
    updateCartFn(updatedUserCart, false);
  }

  return data;
};

export const updateCartItems = (cartItem, originalData, orderQuantity) => {
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
