import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import AppContext from '../context/AppContext';

const MAX_RECIPE_CARDS = 12;

function ExploreFoodsArea() {
  const { mealsArea, mealsFilteredByArea,
    currentArea, setCurrentArea } = useContext(AppContext);
  return (
    <main>
      <Header title="Explorar Origem" />
      <select
        data-testid="explore-by-area-dropdown"
        value={ currentArea }
        onChange={ ({ target }) => setCurrentArea(target.value) }
      >
        {mealsArea.map((area) => (
          <option
            key={ area.strArea }
            data-testid={ `${area.strArea}-option` }
          >
            {area.strArea}
          </option>
        ))}
      </select>
      {mealsFilteredByArea && (
        mealsFilteredByArea.map((meal, index) => (
          index < MAX_RECIPE_CARDS
          && (
            <Link
              to={ `/comidas/${meal.idMeal}` }
              key={ meal.idMeal }
            >
              <article
                data-testid={ `${index}-recipe-card` }
              >
                <h1
                  data-testid={ `${index}-card-name` }
                >
                  { meal.strMeal }
                </h1>
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
              </article>
            </Link>)
        ))
      )}
      <Footer />
    </main>
  );
}

export default ExploreFoodsArea;
