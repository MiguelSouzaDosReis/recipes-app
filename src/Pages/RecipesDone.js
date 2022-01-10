import React from 'react';
import Header from '../Components/Header';

function RecipesDone() {
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
    </main>
  );
}

export default RecipesDone;
