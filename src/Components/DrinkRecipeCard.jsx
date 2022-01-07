import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import saveFavToLocalStorage from '../helpers/saveRecipeToLocalStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareButtonIcon from '../images/shareIcon.svg';

const TIME_TO_HIDE_COPY_MESSAGE = 2000;
function DrinkRecipeCard({ currentRecipe, ingredientsArray, measureArray }) {
  const [clipBoard, setClipBoard] = useState(false);
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

  async function handleURLCopy() {
    const currentURL = window.location.href;
    if ('clipboard' in navigator) {
      return navigator.clipboard.writeText(currentURL);
    }
    return document.execCommand('copy', true, currentURL);
  }

  const handleShareButtonClick = () => {
    handleURLCopy()
      .then(() => {
        setClipBoard(true);
        setTimeout(() => {
          setClipBoard(false);
        }, TIME_TO_HIDE_COPY_MESSAGE);
      })
      .catch((err) => {
        console.log(err);
      });
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
      <button
        type="button"
        onClick={ handleShareButtonClick }
        data-testid="share-btn"
      >
        <img
          src={ shareButtonIcon }
          alt="Compartilhar"
        />
      </button>
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
