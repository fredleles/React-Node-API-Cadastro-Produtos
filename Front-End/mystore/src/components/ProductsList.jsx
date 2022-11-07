import React, { useContext, useEffect } from 'react';
import { AppContext } from '../services/AppProvider';
import SaveBtn from './SaveBtn';

export default function ProductsList() {
  const {
    setSelectedId,
    selectedId,
    products,
    fetchProducts,
  } = useContext(AppContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    products.forEach((p) => {
      const item = document.getElementById(p._id);

      if (p._id !== selectedId) {
        item.classList = "content-List-Item";
      } else {
        item.classList = "content-List-Item selectedItem";
      }
    });
  }, [products, selectedId]);

  return (
    <div className="content-List">
      { products.map((p) => (
        <div key={ p._id } id={ p._id }>
          <div onClick={ () => setSelectedId(p._id) }>
            <p className="color-primary font-bold">{ p.produto }</p>
            <p className="color-text-primary">{ p.tipo }</p>
            <p className="color-primary-bright">{ `R$ ${p.valor.toFixed(2)}` }</p>
          </div>
          <div>
            <SaveBtn productItem={p} btnId={ `btnList-${p._id}` } />
          </div>
        </div>
      ))}
    </div>
  );
}
