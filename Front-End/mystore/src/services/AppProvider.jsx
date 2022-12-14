import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext({});

function AppProvider({ children }) {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) ?? []);
  const [selectedId, setSelectedId] = useState(null);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState({ status: false, edit: false });

  const updateFav = (product) => {
    setFavorites((aFav) => {
      const isFav = aFav.find((f) => f._id === product._id);
      const newFavList = aFav.filter((item) => item._id !== product._id);
      if (!isFav) newFavList.push(product);
      localStorage.setItem('favorites', JSON.stringify(newFavList));
      return newFavList;
    });
  };

  const getProductFav = (id) => {
    const product = favorites.find((item) => item._id === id);
    if (!product) return null;
    return product;
  };

  const contextValue = useMemo(() => ({
    favorites,
    updateFav,
    getProductFav,
    selectedId,
    setSelectedId,
    setProducts,
    products,
    showModal,
    setShowModal,
  }), [favorites, selectedId, products, showModal]);

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}
AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
export default AppProvider;
