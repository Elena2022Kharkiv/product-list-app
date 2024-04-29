export const delProd = async (url, delProdId) => {

    // await fetch(`http://localhost:3000/products/${delProdId}`, {
    await fetch(`${url}/products/${delProdId}`, {
        method: 'DELETE'
    })
    .catch(error => console.error(error))
}
