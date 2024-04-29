import { useState } from "react"

export const AddNewProduct = (props) => {
  const { selectData, addProductHandler } = props;
  const [ title, setTitle ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ category, setCategory ] = useState(1);
  const [showWarningMessage, setShowWarningMessage] = useState(false);

  const addHandler = () => {
    const newProduct = {
      title,
      price,
      category
    }
    console.log(newProduct);

    if (newProduct.title === '' || newProduct.price === '') {
      setShowWarningMessage(true);
      return
    }
    
    addProductHandler(newProduct);
  }

  const addTitle = (e) => {
    setTitle(e.target.value)
    setShowWarningMessage(false);
  }

  const addPrice = (e) => {
    setPrice(Number(e.target.value))
    setShowWarningMessage(false);
  }


  return (
    <div className="products-add">
      <div className="products-add-form">

        <input 
          className="products-add-form__input" 
          value={ title }
          type="text"
          placeholder="Title"
          onChange={ (e) => addTitle(e) }           
        />
        
        <input 
          className="products-add-form__input products-add-form__input_price"
          value={ price }
          type="number" 
          placeholder="Price"
          onChange={ e => addPrice(e) }
        />

        <select className="products-add-form__select" 
          value={ category }
          onChange={ e => setCategory(Number(e.target.value)) }> 
          { 
            selectData.map(item => 
              <option value={ item.id } key={ item.id }>{ item.title }</option>
            ) 
          }
        </select>  

        <button
          className="products-add-form__btn"
          onClick={ addHandler } >         
          Add
        </button>

      </div>
      <div 
        className={`products-add-form__message ${ showWarningMessage && "showMessage" }`}>
          Enter Title and Price please
      </div>
    </div>
  );
}