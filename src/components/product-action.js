export const getProducts = async (setFn) => {
  const response = await fetch(
    "https://localhost:44396/Api/values/GetActiveProductList"
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await response.json();
  const reqItems = JSON.parse(data.content);

  return reqItems;

  //const loadedItems = reqItems.slice();
  // if (typeof afterGetProducts === "function") {
  //   afterGetProducts(reqItems);
  // }
};
