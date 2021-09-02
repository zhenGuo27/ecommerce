import { backendUrl } from "./sharedConst";

export const getProducts = async (sort, filter = "", page=0, pageSize = -1) => {
  const response = await fetch(
    backendUrl + "/Api/values/GetActiveProductList?"+ new URLSearchParams({
      sort: sort,
      filter: filter })
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await response.json();
  let resultData = {
    totalNum: 0,
    reqItems: {}
  };


  resultData.reqItems = JSON.parse(data.content);
  resultData.totalNum = resultData.reqItems.products.length;
  resultData.reqItems.products = getItemsByPage(resultData.reqItems.products, page, pageSize);

  return resultData;
};

const getItemsByPage = (items, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const newItems = items.slice(startIndex, endIndex);

  return newItems;
};

export const getProductById = async (id) => {
  const response = await fetch(
    backendUrl +"/Api/values/GetProductById?"+ new URLSearchParams({
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
    backendUrl + "/Api/values/GetProductByTag?"+ new URLSearchParams({
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
    backendUrl + "/Api/values/GetProductsByMutipleId?"+ new URLSearchParams({
      idStr: ids })
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await response.json();
  const reqItems = JSON.parse(data.content);

  return reqItems;
};