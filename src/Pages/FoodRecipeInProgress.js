import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function FoodRecipeInProcess() {
  const { currentMealRecipe } = useContext(AppContext);
  const {
    ingredientsArray, measureArray,
  } = JSON.parse(localStorage.getItem('ingredientsAndMeasureArray'));
  const { strMealThumb, strMeal, strCategory, strInstructions } = currentMealRecipe;
  const [ingredientStyle, setIngredientStyle] = useState([]);

  const changeIngredientStyle = (name) => {
    if (ingredientStyle.includes(name)) {
      setIngredientStyle(ingredientStyle
        .filter((elementsInArray) => elementsInArray !== name));
    } else {
      setIngredientStyle([...ingredientStyle, name]);
    }
  };

  const getIngredientStyle = (name) => {
    if (ingredientStyle.includes(name)) {
      return 'line-through';
    }
    return 'none';
  };

  return (
    <article>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
      />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <p data-testid="recipe-category">{strCategory}</p>
      <ul>
        {ingredientsArray.map((element, index) => (
          <li
            key={ index }
            style={ {
              listStyleType: 'none' } }
          >
            <label
              htmlFor={ element }
            >
              <input
                id={ element }
                type="checkbox"
                value={ element }
                name={ element }
                onClick={ () => changeIngredientStyle(element) }
              />
              <span style={ { textDecoration: getIngredientStyle(element) } }>
                {element}
                {' - '}
                {measureArray[index]}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <checkbox />
      <p data-testid="instructions">{strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Encerrar Receita
      </button>
    </article>
  );
}
export default FoodRecipeInProcess;
