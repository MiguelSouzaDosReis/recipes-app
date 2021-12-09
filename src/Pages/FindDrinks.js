import React, { useState, useContext } from 'react';
import Header from '../Components/Header';
import AppContext from '../context/AppContext';

const inicial = 0;
const final = 11;
function FindDrinks() {
  const { drinks } = useContext(AppContext);
  const [inicialIndex, setInicialIndex] = useState(inicial);
  const [finalIndex, setFinalIndex] = useState(final);

  const filterDrink = [];

  drinks.forEach((drink, index) => {
    if (index >= inicialIndex && index <= finalIndex) {
      filterDrink.push(drink);
    }
  });

  const onNextButtonClick = () => {
    setInicialIndex(finalIndex + 1);
    setFinalIndex(finalIndex + final + 1);
  };

  return (
    <main>
      <Header title="Bebidas" />
      {(drinks.length > 0 || drinks !== null) && (
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
    </main>
  );
}

export default FindDrinks;
