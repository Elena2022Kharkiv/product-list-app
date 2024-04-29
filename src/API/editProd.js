export const editProd = async (url, editProd) => {

    await fetch(`${url}/products/${editProd.id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json; charset=utf=8'
        },
        body: JSON.stringify(editProd)  
    })
    .catch(error => console.error(error))
}
