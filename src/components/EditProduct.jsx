import { useState } from "react"

export const EditProduct = (props) => {
  const { editProdItem, editHandler, selectData } = props;
  const [ title, setTitle ] = useState(editProdItem.title);
  const [ price, setPrice ] = useState( editProdItem.price);
  const [ category, setCategory ] = useState(editProdItem.category);
  const [showWarningMessage, setShowWarningMessage] = useState(false);

  const editProductHandler = () => {
    const editProduct = {
      id: editProdItem.id,
      title,
      price,
      category
    }
    console.log(editProduct);

    if (editProduct.title === '' || editProduct.price === '') {
      setShowWarningMessage(true);
      return
    }
    
    editHandler(editProduct);
  }

  const editTitle = (e) => {
    setTitle(e.target.value)
    setShowWarningMessage(false);
  }

  const editPrice = (e) => {
    setPrice(e.target.value)
    setShowWarningMessage(false);
  }

  return (
    <div className="products-edit">
      <div className="products-edit-form">

        <input 
          className="products-edit-form__input" 
          value={ title }
          type="text"
          placeholder="Title"
          onChange={ (e) => editTitle(e) }           
        />
        
        <input 
          className="products-edit-form__input products-edit-form__input_price"
          value={ price }
          type="number" 
          placeholder="Price"
          onChange={ e => editPrice(e) }
        />

        <select className="products-edit-form__select" 
          value={ category }
          onChange={ e => setCategory(Number(e.target.value)) }> 
          { 
            selectData.map(item => 
              <option value={ item.id } key={ item.id }>{ item.title }</option>
            ) 
          }
        </select>  

        <button
          className="products-edit-form__btn"
          onClick={ editProductHandler }>         
          Edit
        </button>

      </div>
      <div 
        className={`products-edit-form__message ${ showWarningMessage && "showMessage" }`}>
          Enter Title and Price please
      </div>
    </div>
  );
}