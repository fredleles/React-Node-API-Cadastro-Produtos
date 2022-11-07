import React, { useContext, useEffect } from "react";
import { AppContext } from '../services/AppProvider';
import { requestGet } from '../services/fetchApi';

export default function Header() {
  const {
    setProducts,
  } = useContext(AppContext);
  
  const fetchSearch = async (param) => {
    let list;
    if (param !== '') list = await requestGet(`api/produtos/find?q=${param}`);
    else list = await requestGet('api/produtos');
    if (!list) console.log({ error: 'Cannot reach the DB' });
    setProducts(list);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const elSearch = document.getElementById('searchText');
    let param = elSearch.value;
    param = param.replace(' ', '-');
    fetchSearch(param);
  };

  useEffect(() => {
    async function fetchProducts() {
      const list = await requestGet('api/produtos');
      if (!list) console.log({ error: 'Cannot reach the DB' });
      setProducts(list);
    }
    fetchProducts();
  }, []);

  const handleSearchChange = ({ target }) => {
    if (target.value === '') {
      fetchSearch('');
    }
  };

  return (
    <header className="App-header">
      <div>
        <p>myStore</p>
      </div>
      <div className="searchText">
        <form onSubmit={ handleSubmit }>
          <input
            id="searchText"
            type="text"
            className="searchInput"
            onChange={ handleSearchChange }
            placeholder="Buscar por um produto"
          />
          <button className="searchBtn" type="submit" />
        </form>
      </div>
    </header>
  );
}
