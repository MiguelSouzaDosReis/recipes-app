import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import saveFavToLocalStorage from '../helpers/saveRecipeToLocalStorage';
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
