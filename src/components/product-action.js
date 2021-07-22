export const getProducts = async (sort) => {
  const response = await fetch(
    "https://localhost:44396/Api/values/GetActiveProductList?"+ new URLSearchParams({
      sort: sort })
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await response.json();
  const reqItems = JSON.parse(data.content);

  return reqItems;
};
