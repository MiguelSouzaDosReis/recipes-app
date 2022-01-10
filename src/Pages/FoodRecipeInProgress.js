import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FavoriteButton from '../Components/FavoriteButton';
import ShareButton from '../Components/ShareButton';
import AppContext from '../context/AppContext';
import fetchFoodRecipe from '../services/fetchFoodRecipes';
import { setMealsInProgress } from '../services/setRecipeInProgress';
import saveFavToLocalStorage from '../helpers/saveRecipeToLocalStorage';
import setIngredientsMeasureArray from '../helpers/setIngredientsMeasureArray';

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
  const [isFav, setIsFav] = useState(false);
  const MAX_INGREDIENT_SIZE = 20;
  const ingredientsArray = [];
  const measureArray = [];

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

  const handleFavClick = () => {
    setIsFav(!isFav);
    saveFavToLocalStorage(currentMealRecipe, 'comida');
  };
  setIngredientsMeasureArray(
    currentMealRecipe, ingredientsArray, measureArray, MAX_INGREDIENT_SIZE,
  );
  return (
    <article>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
      />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <ShareButton />
      <FavoriteButton
        handleFavClick={ handleFavClick }
        isFav={ isFav }
        setIsFav={ setIsFav }
      />
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
