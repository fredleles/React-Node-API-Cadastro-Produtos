import React, { useState, useContext, useEffect } from 'react';
import { requestGet } from '../services/fetchApi';
import { AppContext } from '../services/AppProvider';
import SaveBtn from './SaveBtn';

export default function ProductDetails() {
  const [product, setProduct] = useState();
  const { selectedId } = useContext(AppContext);

  useEffect(() => {
    async function fetchProductId() {
      const productDetails = await requestGet(`api/produtos/${selectedId}`);
      if (!productDetails) console.log({ error: 'Cannot reach the DB' });

      setProduct(productDetails);
    }
    if(selectedId) fetchProductId();
  }, [selectedId]);

  return (
    <div className="content-details">
      { product
        ? <>
          <div className="content-details-main">
            <h3>{ product.produto }</h3>
            <div>
              <p>Valor</p>
              <p>{ `R$ ${product.valor}` }</p>
            </div>
            <div>
              <p>{ product.descricao }</p>
            </div>
          </div>
          <hr />
          <div className="content-details-footer">
            <div>
              <button
                type="button"
                className="btn btnAction"
              >
                EDITAR
              </button>
            </div>
            <div>
              <SaveBtn productItem={ product } btnId={ `btnDetail-${product._id}` } />
            </div>
          </div>
        </>
        : <div>
          <p>Selecione um item.</p>
        </div>
      }
    </div>
  );
}
