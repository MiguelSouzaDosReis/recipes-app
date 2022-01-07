import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import fetchFoodRecipe from '../services/fetchFoodRecipes';

function FoodRecipeInProcess() {
  const { meal } = useParams();
  const { currentMealRecipe, setCurrentMealRecipe } = useContext(AppContext);
  const { strMealThumb, strMeal, strCategory, strInstructions } = currentMealRecipe;
  const [ingredientStyle, setIngredientStyle] = useState([]);
  const MAX_INGREDIENT_SIZE = 20;
  const ingredientsArray = [];
  const measureArray = [];

  useEffect(() => {
    async function getRecipe() {
      const recipe = await fetchFoodRecipe(meal);
      const splitedLink = !!recipe && recipe.strYoutube.split('watch?v=');
      const embedLink = `${splitedLink[0]}embed/${splitedLink[1]}`;
      recipe.strYoutube = embedLink;
      setCurrentMealRecipe(recipe);
    }

    getRecipe();
  }, [setCurrentMealRecipe, meal]);

  if (currentMealRecipe) {
    for (let i = 1; i <= MAX_INGREDIENT_SIZE; i += 1) {
      if (currentMealRecipe[`strIngredient${i}`]) {
        ingredientsArray.push(currentMealRecipe[`strIngredient${i}`]);
      }
      if (currentMealRecipe[`strIngredient${i}`]) {
        measureArray.push(currentMealRecipe[`strMeasure${i}`]);
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
export default FoodRecipeInProcess;
