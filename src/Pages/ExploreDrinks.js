import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import fetchRadonDrinkRecipes from '../services/fetchRandomDrinkRecipe';

function ExploreDrink() {
  const history = useHistory();
  const onExploreSurpriseButtonClick = async () => {
    const randomDrink = await fetchRadonDrinkRecipes();
    const { idDrink } = randomDrink;
    history.push(`/bebidas/${idDrink}`);
  };
  return (
    <main>
      <Header
        title="Explorar Bebidas"
        hasSearchButton={ false }
      />
      <Link
        to="/explorar/bebidas/ingredientes"
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
          data-testid="explore-surprise"
          onClick={ onExploreSurpriseButtonClick }
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </main>
  );
}

export default ExploreDrink;
