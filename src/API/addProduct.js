export const addProduct = async (url, newProduct) => {
  console.log(newProduct);

  await fetch(`${url}/products`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf=8'
      },
      body: JSON.stringify(newProduct)
  })
  .catch(error => console.error(error));
} 