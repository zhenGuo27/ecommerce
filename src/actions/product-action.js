export const getProducts = async (sort, filter = "", page=0, pageSize = -1) => {
  const response = await fetch(
    "https://localhost:44396/Api/values/GetActiveProductList?"+ new URLSearchParams({
      sort: sort,
      filter: filter })
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await response.json();
  let reqItems = JSON.parse(data.content);
  reqItems.products = getItemsByPage(reqItems.products, page, pageSize);

  return reqItems;
};

const getItemsByPage = (items, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const newItems = items.slice(startIndex, endIndex);

  return newItems;
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

export const getProductByTagId = async (categoryId , tagId, num) => {
  const response = await fetch(
    "https://localhost:44396/Api/values/GetProductByTag?"+ new URLSearchParams({
      categoryId: categoryId,
      tagId: tagId,
      num: num })
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