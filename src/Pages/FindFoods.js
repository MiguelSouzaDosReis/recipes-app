import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import AppContext from '../context/AppContext';
import CategoriesButtons from '../Components/CategoriesButtons';

const inicial = 0;
const final = 11;
function FindFoods() {
  const {
    meals,
    isFetchLoaded,
    foodCategories,
    mealNameCategory,
    setMealNameCategory,
  } = useContext(AppContext);
  const [inicialIndex, setInicialIndex] = useState(inicial);
  const [finalIndex, setFinalIndex] = useState(final);

  const filteredMeals = [];

  if (isFetchLoaded && meals !== null) {
    meals.forEach((meal, index) => {
      if (index >= inicialIndex && index <= finalIndex) {
        filteredMeals.push(meal);
      }
    });
  }

  const onNextButtonClick = () => {
    setInicialIndex(finalIndex + 1);
    setFinalIndex(finalIndex + final + 1);
  };

  const onCategoryButtonClick = (clickedCategory) => {
    setMealNameCategory(mealNameCategory === clickedCategory ? '' : clickedCategory);
  };

  const CATEGORIES_LIST_SIZE = 5;

  return (
    <main>
      <Header title="Comidas" />
      { isFetchLoaded && foodCategories && (
        <CategoriesButtons
          categories={ foodCategories.slice(0, CATEGORIES_LIST_SIZE) }
          onClick={ ({ target }) => onCategoryButtonClick(target.name) }
        />
      )}
      { (isFetchLoaded && meals !== null) && (
        <div>
          {(meals.length > 0) && (
            filteredMeals.map((meal, index) => (
              <Link
                key={ meal.idMeal }
                to={ `/comidas/${meal.idMeal}` }
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
              </Link>
            ))
          )}
          <button
            type="button"
            onClick={ onNextButtonClick }
          >
            Próximo
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={ onNextButtonClick }
      >
        Próximo
      </button>
      <Footer />
    </main>
  );
}

export default FindFoods;
