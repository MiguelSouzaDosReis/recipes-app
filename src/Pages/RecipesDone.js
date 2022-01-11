import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import ShareButton from '../Components/ShareButton';

function RecipesDone() {
  const [filter, setFilter] = useState('All');
  const doneRecipes = (!localStorage.getItem('doneRecipes')) ? []
    : JSON.parse(localStorage.getItem('doneRecipes'));
  return (
    <main>
      <Header title="Receitas Feitas" hasSearchButton={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('All') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('bebida') }
      >
        Drink
      </button>

      {doneRecipes.filter((recipeFitered) => {
        if (filter === 'All') {
          return recipeFitered.type !== 'All';
        }
        return recipeFitered.type === filter;
      }).map((element, index) => (
        <>
          <Link
            to={ `/${element.type}s/${element.id}` }
          >
            <img
              width="300px"
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
          </Link>
          <h2
            data-testid={ `${index}-horizontal-done-date` }
          >
            {element.doneDate}

          </h2>
          <ShareButton
            type={ element.type }
            id={ element.id }
            index={ index }
          />
          { element.tags && element.tags.map((tag) => (
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
