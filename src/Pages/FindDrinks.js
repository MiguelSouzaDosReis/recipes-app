import React, { useState, useContext } from 'react';
import Header from '../Components/Header';
import AppContext from '../context/AppContext';
import CategoriesButtons from '../Components/CategoriesButtons';
import Footer from '../Components/Footer';

const inicial = 0;
const final = 11;
function FindDrinks() {
  const {
    drinks,
    isFetchLoaded,
    drinkCategories,
    setDrinkNameCategory,
  } = useContext(AppContext);
  console.log(drinks);
  const [inicialIndex, setInicialIndex] = useState(inicial);
  const [finalIndex, setFinalIndex] = useState(final);

  const filterDrink = [];

  if (isFetchLoaded && drinks !== null) {
    drinks.forEach((drink, index) => {
      if (index >= inicialIndex && index <= finalIndex) {
        filterDrink.push(drink);
      }
    });
  }

  const onNextButtonClick = () => {
    setInicialIndex(finalIndex + 1);
    setFinalIndex(finalIndex + final + 1);
  };

  const CATEGORIES_LIST_SIZE = 5;

  return (
    <main>
      <Header title="Bebidas" />
      { isFetchLoaded && (
        <CategoriesButtons
          categories={ drinkCategories.slice(0, CATEGORIES_LIST_SIZE) }
          onClick={ ({ target }) => setDrinkNameCategory(target.name) }
        />
      )}
      { (isFetchLoaded && drinks !== null) && (
        <div>
          {(drinks.length > 0) && (
            filterDrink.map((drink, index) => (
              <article
                data-testid={ `${index}-recipe-card` }
                key={ drink.idDrink }
              >
                <h1
                  data-testid={ `${index}-card-name` }
                >
                  { drink.strDrink }
                </h1>
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </article>
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

export default FindDrinks;
