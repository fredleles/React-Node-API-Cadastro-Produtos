import React, { useContext } from 'react';
import Header from './components/Header';
import ProductDetails from './components/ProductDetails';
import ProductsList from './components/ProductsList';
import Modal from './components/Modal';
import { AppContext } from './services/AppProvider';
import './App.css';

function App() {
  const { setShowModal, showModal } = useContext(AppContext);
  return (
    <div className="App">
      { showModal.status ? <Modal /> : null }
      <Header />
      <main>
        <div className="Main-header">
          <div><h2>Produtos</h2></div>
          <div>
            <button
              type="button"
              onClick={ () => setShowModal({ status: true, edit: false }) }
            >
              +
            </button>
          </div>
        </div>
        <hr />
        <section className="Main-content">
          <div className="Main-content-item">
            <h5>Lista de Produtos</h5>
            <ProductsList />
          </div>
          <div className="Main-content-item">
            <h5>Detalhes</h5>
            <ProductDetails />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
