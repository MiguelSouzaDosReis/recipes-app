import React from 'react';
import Header from '../Components/Header';
import ShareButton from '../Components/ShareButton';

function RecipesDone() {
  const doneRecipes = (!localStorage.getItem('doneRecipes')) ? []
    : JSON.parse(localStorage.getItem('doneRecipes'));
  return (
    <main>
      <Header title="Receitas Feitas" hasSearchButton={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drink
      </button>

      {doneRecipes.map((element, index) => (
        <>
          <img
            key={ index }
            alt={ element.id }
            data-testid={ `${index}-horizontal-image` }
            src={ element.image }
          />
          <h2 data-testid={ `${index}-horizontal-top-text` }>
            {element.alcoholicOrNot ? element.alcoholicOrNot : (
              `${element.area} - ${element.category}`
            )}
          </h2>
          <h1
            data-testid={ `${index}-horizontal-name` }
          >
            { element.name }
          </h1>
          <h2
            data-testid={ `${index}-horizontal-done-date` }
          >
            {element.doneDate}

          </h2>
          <ShareButton
            dataTestId={ `${index}-horizontal-share-btn` }
            type={ element.type }
            id={ element.id }
          />
          { element.tags.map((tag) => (
            <p
              data-testid={ `${index}-${tag}-horizontal-tag` }
              key={ tag }
            >
              {tag}
            </p>))}
        </>
      ))}
    </main>
  );
}

export default RecipesDone;
