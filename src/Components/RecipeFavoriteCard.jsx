import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import checkFavInLocalStorage from '../helpers/checkFavInLocalStorage';

function RecipeFavoriteCard() {
  const [recipeData, setRecipeData] = useState([]);
  const [isFav, setIsFav] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const getRecipeData = () => {
      if (localStorage.getItem('favoriteRecipes') !== null) {
        const recipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
        setRecipeData(recipe);
      }
    };
    getRecipeData();
  }, [isFav]);

  const handleFavClick = (id) => {
    setIsFav(!isFav);
    if (recipeData.length > 0) {
      checkFavInLocalStorage(id);
    }
  };

  return (
    <main>
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
      {recipeData.length > 0 ? (
        recipeData.filter((recipeFitered) => {
          if (filter === 'All') {
            return recipeFitered.type !== 'All';
          }
          return recipeFitered.type === filter;
        }).map((recipe, index) => (
          <section key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                style={ { width: '300px' } }
              />
              <h2
                data-testid={ `${index}-horizontal-name` }
              >
                { recipe.name }
              </h2>
            </Link>
            {recipe.type === 'comida' ? (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.area}
                {' - '}
                { recipe.category }
              </p>
            ) : (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.alcoholicOrNot }
              </p>
            ) }
            <ShareButton
              type={ recipe.type }
              id={ recipe.id }
              index={ index }
            />
            <FavoriteButton
              handleFavClick={ () => handleFavClick(recipe.id) }
              isFav={ isFav }
              setIsFav={ setIsFav }
              dataTestId={ `${index}-horizontal-favorite-btn` }
            />
          </section>
        ))
      ) : (<p>Você não tem receitas favoritas</p>)}
    </main>
  );
}

export default RecipeFavoriteCard;
