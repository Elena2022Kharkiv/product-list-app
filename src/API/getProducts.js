export const getProducts = async (url, id, page) => {
  console.log(id, page); 

  let urlProducts;
  let limit = 7;
 
  if (id === 3) {
    urlProducts = `${url}/products?_start=${(page - 1) * 7}&_limit=${limit}`;
  } else {
    urlProducts = `${url}/products?category=${id}&_start=${(page - 1) * 7}&_limit=${limit}`;
  }

  const response = await fetch(urlProducts);  
  const data = await response.json();
  return data;
}
