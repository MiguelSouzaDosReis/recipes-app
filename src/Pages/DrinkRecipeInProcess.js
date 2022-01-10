import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import fetchDrinkRecipes from '../services/fetchDrinkRecipes';
import { setDrinkInProgress } from '../services/setRecipeInProgress';
import FavoriteButton from '../Components/FavoriteButton';
import ShareButton from '../Components/ShareButton';
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

function DrinkRecipeInProgress() {
  const { drink } = useParams();
  const { currentDrinkRecipe, setCurrentDrinkRecipe } = useContext(AppContext);
  const defaultRecipeShape = {
    strDrinkThumb: '',
    strDrink: '',
    strCategory: '',
    strInstructions: '',
  };
  const {
    strDrinkThumb, strDrink, strCategory, strInstructions,
  } = currentDrinkRecipe || defaultRecipeShape;
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

  useEffect(() => {
    if (currentDrinkRecipe) {
      setDrinkInProgress({
        id: currentDrinkRecipe.idDrink, ingredientsArray: ingredientStyle });
    }
  }, [ingredientStyle, currentDrinkRecipe]);

  const handleFavClick = () => {
    setIsFav(!isFav);
    saveFavToLocalStorage(currentDrinkRecipe, 'bebida');
  };
  setIngredientsMeasureArray(
    currentDrinkRecipe, ingredientsArray, measureArray, MAX_INGREDIENT_SIZE,
  );

  const isDoneButtonDisabled = ingredientsArray.length !== ingredientStyle.length;

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
      <Link
        to="/receitas-feitas"
      >

        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ isDoneButtonDisabled }
        >
          Encerrar Receita
        </button>
      </Link>
    </article>
  );
}
export default DrinkRecipeInProgress;
