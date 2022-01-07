import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import saveFavToLocalStorage from '../helpers/saveRecipeToLocalStorage';
/* import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg'; */
// import shareButtonIcon from '../images/shareIcon.svg';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

// const TIME_TO_HIDE_COPY_MESSAGE = 2000;
function MealRecipeCard({ currentMealRecipe, ingredientsArray, measureArray }) {
  // const [clipBoard, setClipBoard] = useState(false);
  const [isFav, setIsFav] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      recipes.forEach((recipe) => {
        if (recipe.id === currentMealRecipe.idMeal) {
          setIsFav(true);
        }
      });
    }
  }, [currentMealRecipe]);

  const handleFavClick = () => {
    setIsFav(!isFav);
    saveFavToLocalStorage(currentMealRecipe, 'comida');
  };

  /* async function handleURLCopy() {
    const currentURL = window.location.href;
    if (navigator.clipboard) {
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
  }; */

  return (
    <>
      <img
        width="300px"
        src={ currentMealRecipe.strMealThumb }
        alt={ currentMealRecipe.strMeal }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{currentMealRecipe.strMeal}</h2>
      <h4 data-testid="recipe-category">{currentMealRecipe.strCategory}</h4>
      <ShareButton />
      <FavoriteButton
        handleFavClick={ handleFavClick }
        isFav={ isFav }
        setIsFav={ setIsFav }
      />
      {/* <button
        type="button"
        onClick={ handleShareButtonClick }
        data-testid="share-btn"
      >
        <img
          src={ shareButtonIcon }
          alt="Compartilhar"
        />
      </button> */}
      {/* {clipBoard && <p>Link copiado!</p>} */}
      {/* <button
        type="button"
        onClick={
          () => handleFavClick()
        }
      >
        <img
          data-testid="favorite-btn"
          src={ isFav ? blackHeartIcon : whiteHeartIcon }
          alt={ isFav ? 'coração preto' : 'coração branco' }
        />
      </button> */}
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
      <p data-testid="instructions">{currentMealRecipe.strInstructions}</p>
      <iframe
        data-testid="video"
        width="1088"
        height="612"
        src={ currentMealRecipe.strYoutube }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture"
        allowFullScreen
      />
    </>
  );
}

MealRecipeCard.propTypes = {
  currentMealRecipe: PropTypes.shape({
    idMeal: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strYoutube: PropTypes.string,
  }).isRequired,
  ingredientsArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  measureArray: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default MealRecipeCard;
