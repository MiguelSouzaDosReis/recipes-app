import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import fetchDrinkRecipe from '../services/fetchDrinkRecipes';
import fetchMealsDefault from '../services/fetchMealsDefault';
import AppContext from '../context/AppContext';
import { setDrinkInProgress } from '../services/setRecipeInProgress';
import CarouselsContainer, { Card, Container } from './style/detailsStyle';
import renderRecomendation from '../helpers/renderRecomendation';
import isRecipeDrinkDone from '../helpers/isRecipeDrinkDone';
import DrinkRecipeCard from '../Components/DrinkRecipeCard';

const inProgressRecipes = () => (localStorage
  .getItem('inProgressRecipes') !== null ? JSON
    .parse(localStorage.getItem('inProgressRecipes')) : { cocktails: { } });

const doneRecipes = () => (localStorage
  .getItem('doneRecipes') !== null ? JSON
    .parse(localStorage.getItem('doneRecipes')) : [{ id: '' }]);

function DrinkDetails() {
  const { slug } = useParams();
  const { currentDrinkRecipe, setCurrentDrinkRecipe } = useContext(AppContext);
  const [mealsRecomendation, setMealsRecomendation] = useState([]);
  const [countNextButton, setCountNextButton] = useState(0);
  const ingredientsArray = [];
  const measureArray = [];
  const MAX_INGREDIENT_SIZE = 15;
  const RECOMENDATION_CARD_SIZE = 6;

  useEffect(() => {
    async function getRecipe() {
      const recipe = await fetchDrinkRecipe(slug);
      setCurrentDrinkRecipe(recipe);
    }
    async function getDefaultRecomendations() {
      const defaultRecomendation = await fetchMealsDefault();
      setMealsRecomendation(defaultRecomendation);
    }
    getRecipe();
    getDefaultRecomendations();
  }, [setCurrentDrinkRecipe, slug]);

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

  localStorage
    .setItem('ingredientsAndMeasureArray', JSON
      .stringify({ ingredientsArray, measureArray }));

  const finalizedRecipe = isRecipeDrinkDone(currentDrinkRecipe, doneRecipes);
  return (
    <main>
      {currentDrinkRecipe && (
        <article>
          <DrinkRecipeCard
            currentRecipe={ currentDrinkRecipe }
            ingredientsArray={ ingredientsArray }
            measureArray={ measureArray }
          />
          <Container>
            <button
              type="button"
              onClick={
                () => renderRecomendation('prev', setCountNextButton, countNextButton)
              }
            >
              Prev
            </button>
            <CarouselsContainer>
              {mealsRecomendation && mealsRecomendation.map((meal, index) => (
                index < RECOMENDATION_CARD_SIZE && (
                  <Link
                    key={ meal.idMeal }
                    to={ `/comidas/${meal.idMeal}` }
                    hidden={
                      !(index === countNextButton || index === countNextButton + 1)
                    }
                  >
                    <Card
                      data-testid={ `${index}-recomendation-card` }
                    >
                      <h1
                        data-testid={ `${index}-recomendation-title` }
                      >
                        { meal.strMeal }
                      </h1>
                      <img
                        src={ meal.strMealThumb }
                        alt={ meal.strMeal }
                        data-testid={ `${index}-card-img` }
                      />
                    </Card>
                  </Link>
                )
              ))}
            </CarouselsContainer>
            <button
              type="button"
              onClick={
                () => renderRecomendation('next', setCountNextButton, countNextButton)
              }
            >
              Next
            </button>
          </Container>
          <Link
            to={ `/bebidas/${currentDrinkRecipe.idDrink}/in-progress` }
          >
            <button
              type="button"
              data-testid="start-recipe-btn"
              style={ {
                bottom: 0,
                position: 'fixed',
                display: finalizedRecipe ? 'none' : 'block',
              } }
              onClick={ () => setDrinkInProgress({
                id: currentDrinkRecipe.idDrink, ingredientsArray: [],
              }) }
            >
              {inProgressRecipes().cocktails[currentDrinkRecipe.idDrink] ? (
                'Continuar Receita'
              ) : ('Iniciar Receita')}
            </button>
          </Link>
        </article>
      )}
    </main>
  );
}

export default DrinkDetails;
