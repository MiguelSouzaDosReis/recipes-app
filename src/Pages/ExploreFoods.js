import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function ExploreFoods() {
  return (
    <main>
      <Header title="Explorar Comidas" hasSearchButton={ false } />
      <h1>Explorar Comidas</h1>
      <Footer />
      <Link
        to="/explorar/comidas/ingredientes"
      >
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link
        to="/"
      >
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link
        to="/"
      >
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
    </main>
  );
}

export default ExploreFoods;
