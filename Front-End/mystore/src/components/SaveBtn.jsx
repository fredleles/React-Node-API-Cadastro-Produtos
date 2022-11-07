import React, { useContext, useEffect } from 'react';
import { AppContext } from '../services/AppProvider';

export default function SaveBtn({ productItem, btnId }) {
  const {
    getProductFav,
    updateFav,
    favorites,
  } = useContext(AppContext);  

  useEffect(() => {
    const saveBtn = document.getElementById(btnId);
    if (getProductFav(productItem._id)) saveBtn.textContent = 'RemFav';
    else saveBtn.textContent = 'AddSave';
  }, [favorites, btnId]);

  return (
    <button
      type="button"
      id={ btnId }
      onClick={ () => updateFav(productItem) }
    >
    </button>
  );
}
