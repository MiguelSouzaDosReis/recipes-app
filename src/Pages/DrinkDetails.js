import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import fetchDrinkRecipe from '../services/fetchDrinkRecipes';
import AppContext from '../context/AppContext';
import fetchMealsDefault from '../services/fetchMealsDefault';

function DrinkDetails() {
  const { slug } = useParams();
  const { currentDrinkRecipe, setCurrentDrinkRecipe } = useContext(AppContext);
  const [mealsRecomendation, setMealsRecomendation] = useState([]);
  const ingredientsArray = [];
  const MAX_INGREDIENT_SIZE = 20;
  useEffect(() => {
    async function getRecipe() {
      const recipe = await fetchDrinkRecipe(slug);
      setCurrentDrinkRecipe(recipe);
    }
    async function getDefaultRecomendations() {
      const defaultRecomendation = await fetchMealsDefault();
      setMealsRecomendation(defaultRecomendation);
      console.log(defaultRecomendation);
    }
    getRecipe();
    getDefaultRecomendations();
  }, [setCurrentDrinkRecipe, slug]);

  if (currentDrinkRecipe) {
    for (let i = 1; i <= MAX_INGREDIENT_SIZE; i += 1) {
      if (currentDrinkRecipe[`strIngredient${i}`]) {
        ingredientsArray.push(currentDrinkRecipe[`strIngredient${i}`]);
      }
    }
  }

  return (
    <main>
      {currentDrinkRecipe && (
        <article>
          <img
            width="300px"
            src={ currentDrinkRecipe.strDrinkThumb }
            alt={ currentDrinkRecipe.strDrink }
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{currentDrinkRecipe.strDrink}</h2>
          <button
            data-testid="share-btn"
            type="button"
          >
            Compartilhar
          </button>

          <button
            data-testid="favorite-btn"
            type="button"
          >
            Favoritar
          </button>
          <p data-testid="recipe-category">{currentDrinkRecipe.strCategory}</p>
          <div>
            <ul>
              {
                ingredientsArray.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {ingredient}
                  </li>
                ))
              }
            </ul>
          </div>
          <p data-testid="instructions">{currentDrinkRecipe.strInstructions}</p>
          <div>
            {mealsRecomendation && mealsRecomendation.map((drink, index) => (
              <Link
                key={ drink.idMeal }
                to={ `/bebidas/${drink.idMeal}` }
              >
                <article
                  data-testid={ `${index}-recomendation-card` }
                >
                  <h1
                    data-testid={ `${index}-card-name` }
                  >
                    { drink.strMeal }
                  </h1>
                  <img
                    src={ drink.strMealThumb }
                    alt={ drink.strMeal }
                    data-testid={ `${index}-card-img` }
                  />
                </article>
              </Link>
            ))}
          </div>
          <button
            data-testid="start-recipe-btn"
            type="button"
          >
            iniciar receita
          </button>
        </article>
      )}
    </main>
  );
}

export default DrinkDetails;
