import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import fetchFoodRecipe from '../services/fetchFoodRecipes';
import { setMealsInProgress } from '../services/setRecipeInProgress';

const changeIngredientStyle = (ingredientStyle, name) => {
  if (ingredientStyle.includes(name)) {
    return (ingredientStyle
      .filter((elementsInArray) => elementsInArray !== name));
  }
  return ([...ingredientStyle, name]);
};

const getIngredientStyle = (ingredientStyle, name) => {
  if (ingredientStyle.includes(name)) {
    return 'line-through';
  }
  return 'none';
};

function FoodRecipeInProcess() {
  const { meal } = useParams();
  const { currentMealRecipe, setCurrentMealRecipe } = useContext(AppContext);
  const { strMealThumb, strMeal, strCategory, strInstructions } = currentMealRecipe;
  const [ingredientStyle, setIngredientStyle] = useState(() => {
    if (!localStorage.getItem('inProgressRecipes')) return [];
    const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    return meal in meals ? meals[meal] : [];
  });
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

  useEffect(() => {
    setMealsInProgress({
      id: currentMealRecipe.idMeal, ingredientsArray: ingredientStyle });
  }, [ingredientStyle, currentMealRecipe.idMeal]);

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
                checked={
                  getIngredientStyle(ingredientStyle, element) === 'line-through'
                }
                onClick={ () => setIngredientStyle(
                  changeIngredientStyle(ingredientStyle, element),
                ) }
              />
              <span
                style={ {
                  textDecoration: getIngredientStyle(ingredientStyle, element),
                } }
              >
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
