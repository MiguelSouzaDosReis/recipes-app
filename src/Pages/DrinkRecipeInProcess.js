import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import fetchDrinkRecipes from '../services/fetchDrinkRecipes';
import { setDrinkInProgress } from '../services/setRecipeInProgress';
import FavoriteButton from '../Components/FavoriteButton';
import ShareButton from '../Components/ShareButton';
import saveFavToLocalStorage from '../helpers/saveRecipeToLocalStorage';

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

function DrinkRecipeInProgress() {
  const { drink } = useParams();
  const { currentDrinkRecipe, setCurrentDrinkRecipe } = useContext(AppContext);
  const { strDrinkThumb, strDrink, strCategory, strInstructions } = currentDrinkRecipe;
  const [ingredientStyle, setIngredientStyle] = useState(() => {
    if (!localStorage.getItem('inProgressRecipes')) return [];
    const { cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    return drink in cocktails ? cocktails[drink] : [];
  });
  const [isFav, setIsFav] = useState(false);

  const MAX_INGREDIENT_SIZE = 15;
  const ingredientsArray = [];
  const measureArray = [];

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      recipes.forEach((recipe) => {
        if (recipe.id === currentDrinkRecipe.idDrink) {
          setIsFav(true);
        }
      });
    }
  }, [currentDrinkRecipe]);

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

  useEffect(() => {
    setDrinkInProgress({
      id: currentDrinkRecipe.idDrink, ingredientsArray: ingredientStyle });
  }, [ingredientStyle, currentDrinkRecipe.idDrink]);

  const handleFavClick = () => {
    setIsFav(!isFav);
    saveFavToLocalStorage(currentDrinkRecipe, 'bebida');
  };
  return (
    <article>
      <img
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
      />
      <h1 data-testid="recipe-title">{strDrink}</h1>
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
export default DrinkRecipeInProgress;
