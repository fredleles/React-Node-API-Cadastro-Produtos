import React, { useContext, useState, useEffect } from "react";
import { AppContext } from '../services/AppProvider';
import { requestGet, requestPost, requestPut } from '../services/fetchApi';

export default function Modal() {
  const [data, setData] = useState({
    produto: '',
    valor: '',
    descricao: '',
    tipo: '',
  });
  const { setShowModal, fetchProducts, showModal, selectedId } = useContext(AppContext);

  useEffect(() => {
    async function fetchProduct() {
      const productDetails = await requestGet(`api/produtos/${selectedId}`);
      if (!productDetails) console.log({ error: 'Cannot reach the DB' });
      else setData((state) => ({
        ...state,
        ...productDetails,
      }));
    }
    if (showModal.edit) {
      fetchProduct();
    }
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    async function postData() {
      let res;
      const payload = {
        ...data,
        valor: parseFloat(data.valor),
      };
      if (!showModal.edit) res = await requestPost('api/produtos', payload);
      else res = await requestPut(`api/produtos/${selectedId}`, payload);
      if (!res._id) console.log('Erro ao inserir dados');
      else {
        await fetchProducts();
        setShowModal(false);
      }
    }
    postData();
  };

  const handleChange = ({ target }) => {
    if (target.id === 'valor') {
      let aValue = target.value;
      aValue = aValue.replace(',', '.');
      if (!isNaN(+aValue)) {
        setData((state) => ({
          ...state,
          [target.id]: aValue,
        }));
      }
    } else {
      setData((state) => ({
        ...state,
        [target.id]: target.value,
      }));
    }
  };

  return (
    <div className="modal">
      <div className="outer-modal"></div>
      <div className="inner-modal">
      <h3>Novo Produto</h3>
      <form onSubmit={ handleSubmit }>
        <div className="modal-header">
          <div>
            <label htmlFor="produto">Produto</label>
            <input
              type="text"
              id="produto"
              value={ data.produto }
              onChange={ handleChange }
            />
          </div>
          <div>
            <label htmlFor="valor">Valor (R$)</label>
            <input
              type="text"
              id="valor"
              value={ data.valor }
              onChange={ handleChange }
            />
          </div>
          <div>
            <label htmlFor="tipo">Categoria</label>
            <input
              type="text"
              id="tipo"
              value={ data.tipo }
              onChange={ handleChange }
            />
          </div>
        </div>
        <div className="modal-desc">
          <label htmlFor="descricao">Descricao (R$)</label>
          <textarea
            type="text"
            id="descricao"
            value={ data.descricao }
            onChange={ handleChange }
          />
        </div>
        <div className="modal-footer">
          <button className="btn btnAction" type="submit">ADD</button>
          <button
            className="btn btnAction"
            type="button"
            onClick={ () => setShowModal({ status: false, edit: false }) }
          >
            FECHAR
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
