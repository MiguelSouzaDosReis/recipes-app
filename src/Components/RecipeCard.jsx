import React, { useState } from 'react';
import copyToClipBoard from '../helpers/copyToClipBoard';

function DrinkRecipeCard(currentRecipe, ingredientsArray, measureArray) {
  const [clipBoard, setClipBoard] = useState('');
  return (
    <div>
      <img
        width="300px"
        src={ currentRecipe.strDrinkThumb }
        alt={ currentRecipe.strDrink }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{currentRecipe.strDrink}</h2>
      <h4 data-testid="recipe-category">{currentRecipe.strAlcoholic}</h4>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => {
          setClipBoard(copyToClipBoard(window.location.href));
        } }
      >
        Compartilhar
      </button>
      {clipBoard && <p>Link copiado!</p>}

      <button
        data-testid="favorite-btn"
        type="button"
      >
        Favoritar
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
    </div>
  );
}

export default DrinkRecipeCard;
