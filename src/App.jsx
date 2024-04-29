import { useEffect, useState } from "react";
import { getProducts } from "./API";
import { getProductsAll } from "./API";
import { getSumm } from "./utils/functions";
import { getCategory } from "./API";
import { AddNewProduct } from "./components/AddNewProduct";
import { addProduct } from "./API";
import { delProd } from "./API";
import { editProd } from "./API";
import { EditProduct } from "./components/EditProduct";


const App = () => {
  const url = 'http://localhost:3000';
  const [products, setProducts] = useState([]);
  const [select, setSelect] = useState(3); 
  const [selectData, setSelectData] = useState([]); 
  const [isAddActive, setIsAddActive] = useState(false); 
  const [lastProdId, setLastProdId] = useState('');
  const [isEditActive, setIsEditActive] = useState(false);
  const [editProdItem, setEditProdItem] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [update, setUpdate] = useState(false);


  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts(url, select, currentPage);
        setProducts(data);
        console.log(data);

      } catch( error ) {
        console.log('Fetch error !!!');
      }
    })();
  }, [select, update, currentPage]);


  useEffect(() => {
    (async () => {
      try {
        const dataCat = await getCategory(url);
        setSelectData(dataCat);
        console.log(dataCat);

      } catch( error ) {
        console.log('Fetch error !!!');
      }
    })();
  }, []);

  
  useEffect(() => {
    (async () => {
      try {
        const data = await getProductsAll(url);   
        console.log(data);       
        setLastProdId(data.length);
  
      } catch( error ) {
        console.log('Fetch error !!!');
      }
    })();  
  }, []);


  const addProductHandler = (newProduct) => {    
    newProduct.id = String(lastProdId + 1);
    setLastProdId(lastProdId + 1);
    console.log(lastProdId);

    (async () => {
      try {
        await addProduct(url, newProduct);
        setUpdate(prev => !prev)

      } catch( error ) {
        console.log('Fetch error !!!');
      }
    })();  

    setIsAddActive(false); 
  }
  

  const delProdHandler = (e) => {
    const delProdId = e.target.dataset.id;
    console.log(delProdId);

    (async () => {
      try {
        await delProd(url, delProdId);        
        setUpdate(prev => !prev)

      } catch( error ) {
        console.log('Fetch error !!!');
      }
    })();  
  }


  const editProdHandler = (e) => {
    const editProdId = e.target.dataset.id;
    let editProdElem = products.find(elem => elem.id === editProdId);
    console.log(editProdElem);

    setEditProdItem(editProdElem);
    setIsEditActive(true);
  }


  const editHandler = (editProduct) => {
    console.log(editProduct);

    (async () => {
      try {
        await editProd(url, editProduct);
        setIsEditActive(false);
        setUpdate(prev => !prev)

      } catch( error ) {
        console.log('Fetch error !!!');
      }
    })();  
  }


  const getCurrentPage = (e) => {
    console.log(e.target);
    if (!e.target.dataset.index) return;

    let curPage;
    if (e.target.dataset.index === 'prev') {
      console.log(e.target.dataset.index);
      curPage = (currentPage - 1);
      if(curPage <= 0) return;
    } else if (e.target.dataset.index === 'next') {
      console.log(e.target.dataset.index);
      curPage = (currentPage + 1);
      if(curPage > 3) return;

    } else {
      curPage = +(e.target.dataset.index);
    }

    setCurrentPage(curPage);
    console.log(e.target.dataset.index);
  }


  return (
    <div className="container">
      <h1>Products list app</h1>
      <div className="products-list">

        <select className="products-list__select"
          value={select}
          onChange={ e => setSelect(Number(e.target.value)) } >
          { 
            selectData.map(item => 
              <option value={ item.id } key={ item.id }>{ item.title }</option>
            ) 
          }
        </select>  

        <button 
          className={`products-list__btn products-list__btn_add ${ isAddActive && "hide" }`}
          onClick={ () => setIsAddActive(true) }>
          Add new product                     
        </button> 

        { isAddActive && <AddNewProduct addProductHandler={addProductHandler} selectData={selectData} />}

        { isEditActive && <EditProduct editProdItem={editProdItem} editHandler={editHandler} selectData={selectData}/> }  

        <ul className="products-list__content">
          {
            products.map(product => 
              <li className="products-list__item" key={ product.id }>
                  { product.title } &nbsp;  
                  <span>Price: { product.price } Category: { product.category }</span>
                  <button 
                    className="products-list__btn products-list__btn_edit"
                    data-id={ product.id }
                    onClick={(e) => editProdHandler(e)}
                  > 
                    Edit                      
                  </button>

                  <button 
                    className="products-list__btn products-list__btn_del"
                    data-id={ product.id }
                    onClick={(e) => delProdHandler(e)}
                  >
                    Del
                  </button>
              </li>
            )
          }
        </ul>
        { <div className="products-list__total">Total: { getSumm(products) }</div> }
        <ul className="pagination" onClick={(e) => getCurrentPage(e)} >
            <li className="pagination__prev" data-index="prev">&#171;</li>
            <li data-index="1" className={`pagination__page ${(currentPage === 1) && "active" }`}>1</li>
            <li data-index="2" className={`pagination__page ${(currentPage === 2) && "active" }`}>2</li>
            <li data-index="3" className={`pagination__page ${(currentPage === 3) && "active" }`}>3</li>
            <li className="pagination__next" data-index="next">&#187;</li>
        </ul>      
      </div>
    </div>
  );
}

export default App;
