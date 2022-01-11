import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Explorer() {
  return (
    <main>
      <Header title="Explorar" hasSearchButton={ false } />
      <h1>Explorar</h1>
      <Link
        to="/explorar/comidas"
      >
        <button
          type="button"
          data-testid="explore-food"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link
        to="/explorar/bebidas"
      >
        <button
          type="button"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </button>
      </Link>
      <Footer />
    </main>
  );
}

export default Explorer;
