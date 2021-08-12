export const getUserCartByUid = async (uid) => {
  const response = await fetch(
    "https://localhost:44396/Api/values/GetCartByUid?" +
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
    "https://localhost:44396/Api/values/UpdateCartByUser",
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

  console.log("updateUserCart", data);  
};

export const getUserCartItems = async (userUid, cookies) => {
  let result = [];

  if (userUid) {
    await getUserCartByUid(userUid).then((item) => {
      const userCart = { ...item };
      if (Object.keys(userCart).length !== 0) {
        result = [...userCart.cartItems];
      }
    });
  } else {
    if (cookies && cookies.cart) {
      result = [...cookies.cart.cartItems];
    }
  }
  return result;
};
