export const getProducts = async (sort, filter = "") => {
  const response = await fetch(
    "https://localhost:44396/Api/values/GetActiveProductList?"+ new URLSearchParams({
      sort: sort,
      filter: filter })
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await response.json();
  const reqItems = JSON.parse(data.content);

  return reqItems;
};

export const getProductById = async (id) => {
  const response = await fetch(
    "https://localhost:44396/Api/values/GetProductById?"+ new URLSearchParams({
      id: id })
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await response.json();
  const reqItems = JSON.parse(data.content);

  return reqItems;
};

export const getProductByMutipleId = async (ids) => {
  const response = await fetch(
    "https://localhost:44396/Api/values/GetProductsByMutipleId?"+ new URLSearchParams({
      idStr: ids })
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await response.json();
  const reqItems = JSON.parse(data.content);

  return reqItems;
};