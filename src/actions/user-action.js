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

  console.log("getUserCartByUid response", response);

  const data = await response.json();
  console.log("data", data);

  if (data.returnCode === -1) {
    console.log("getUserCartByUid", data.content);
    return null;
  } else {
    const reqItems = JSON.parse(data.content);
    console.log("getUserCartByUid", reqItems);
    return reqItems;
  }



//   const reqItems = JSON.parse(data.content);
//   console.log("getUserCartByUid", reqItems);

  //return reqItems;
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
