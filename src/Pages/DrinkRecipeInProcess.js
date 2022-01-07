import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import fetchDrinkRecipes from '../services/fetchDrinkRecipes';

function DrinkRecipeInProgress() {
  const { drink } = useParams();
  const { currentDrinkRecipe, setCurrentDrinkRecipe } = useContext(AppContext);
  const { strDrinkThumb, strDrink, strCategory, strInstructions } = currentDrinkRecipe;
  const [ingredientStyle, setIngredientStyle] = useState([]);
  const MAX_INGREDIENT_SIZE = 15;
  const ingredientsArray = [];
  const measureArray = [];

  useEffect(() => {
    async function getRecipe() {
      const recipe = await fetchDrinkRecipes(drink);
      setCurrentDrinkRecipe(recipe);
    }
    getRecipe();
  }, [setCurrentDrinkRecipe, drink]);

  if (currentDrinkRecipe) {
    for (let i = 1; i <= MAX_INGREDIENT_SIZE; i += 1) {
      if (currentDrinkRecipe[`strIngredient${i}`]) {
        ingredientsArray.push(currentDrinkRecipe[`strIngredient${i}`]);
      }
      if (currentDrinkRecipe[`strIngredient${i}`]) {
        measureArray.push(currentDrinkRecipe[`strMeasure${i}`]);
      }
    }
  }

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
        src={ strDrinkThumb }
        alt={ strDrink }
      />
      <h1 data-testid="recipe-title">{strDrink}</h1>
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
            data-testid={ `${index}-ingredient-step` }
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
export default DrinkRecipeInProgress;
