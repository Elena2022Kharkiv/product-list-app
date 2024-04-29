export const getProductsAll = async (url) => {

  const urlProductsAll = `${url}/products`;

  const response = await fetch(urlProductsAll);

  const data = await response.json();
  return data;
}