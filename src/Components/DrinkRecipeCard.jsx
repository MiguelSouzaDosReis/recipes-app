import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import saveFavToLocalStorage from '../helpers/saveRecipeToLocalStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DrinkRecipeCard({ currentRecipe, ingredientsArray, measureArray }) {
  const [clipBoard, setClipBoard] = useState('');
  const [isFav, setIsFav] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      recipes.forEach((recipe) => {
        if (recipe.id === currentRecipe.idDrink) {
          setIsFav(true);
        }
      });
    }
  }, [currentRecipe]);

  const handleFavClick = () => {
    setIsFav(!isFav);
    saveFavToLocalStorage(currentRecipe, 'bebida');
  };
  return (
    <>
      <img
        width="300px"
        src={ currentRecipe.strDrinkThumb }
        alt={ currentRecipe.strDrink }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{currentRecipe.strDrink}</h2>
      <h4 data-testid="recipe-category">{currentRecipe.strAlcoholic}</h4>
      <CopyToClipboard
        text={ window.location.href }
        onCopy={ () => setClipBoard(window.location.href) }
      >
        <button
          data-testid="share-btn"
          type="button"
        >
          Compartilhar
        </button>
      </CopyToClipboard>
      {clipBoard && <p>Link copiado!</p>}
      <button
        type="button"
        onClick={ () => handleFavClick() }
      >
        <img
          src={ isFav ? blackHeartIcon : whiteHeartIcon }
          alt={ isFav ? 'coração preto' : 'coração branco' }
          data-testid="favorite-btn"
        />

      </button>
      <p data-testid="recipe-category">{currentRecipe.strCategory}</p>
      <div>
        <ul>
          {
            ingredientsArray.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient}
                {' - '}
                {measureArray[index]}
              </li>
            ))
          }
        </ul>
      </div>
      <p data-testid="instructions">{currentRecipe.strInstructions}</p>
    </>
  );
}

DrinkRecipeCard.propTypes = {
  currentRecipe: PropTypes.shape({
    idDrink: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strInstructions: PropTypes.string,
  }).isRequired,
  ingredientsArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  measureArray: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default DrinkRecipeCard;
