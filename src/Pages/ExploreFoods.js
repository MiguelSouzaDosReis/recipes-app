import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import fetchRandomFoodRecipe from '../services/fetchRandomFoodRecipe';

function ExploreFoods() {
  const history = useHistory();
  const onExploreSurpriseButtonClick = async () => {
    const randomMeal = await fetchRandomFoodRecipe();
    const { idMeal } = randomMeal;
    history.push(`/comidas/${idMeal}`);
  };
  return (
    <main>
      <Header title="Explorar Comidas" hasSearchButton={ false } />
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
        to="/explorar/comidas/area"
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
          onClick={ onExploreSurpriseButtonClick }
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </main>
  );
}

export default ExploreFoods;
