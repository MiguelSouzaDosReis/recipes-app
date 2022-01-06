import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import fetchFoodRecipe from '../services/fetchFoodRecipes';
import fetchDrinksDefault from '../services/fetchDrinksDefault';
import AppContext from '../context/AppContext';
import { setMealsInProgress } from '../services/setRecipeInProgress';
import CarouselsContainer, { Card, Container } from './style/detailsStyle';
import renderRecomendation from '../helpers/renderRecomendation';
import isRecipeDone from '../helpers/isRecipeDone';

const inProgressRecipes = () => (localStorage
  .getItem('inProgressRecipes') !== null ? JSON
    .parse(localStorage.getItem('inProgressRecipes')) : { id: '' });

const doneRecipes = () => (localStorage
  .getItem('doneRecipes') !== null ? JSON
    .parse(localStorage.getItem('doneRecipes')) : [{ id: '' }]);

function FoodDetails() {
  const { slug } = useParams();
  const { currentMealRecipe, setCurrentMealRecipe } = useContext(AppContext);
  const [drinksRecomendation, setDrinksRecomendation] = useState([]);
  const [countNextButton, setCountNextButton] = useState(0);
  const ingredientsArray = [];
  const measureArray = [];
  const MAX_INGREDIENT_SIZE = 20;
  const RECOMENDATION_CARD_SIZE = 6;

  useEffect(() => {
    async function getRecipe() {
      const recipe = await fetchFoodRecipe(slug);
      const splitedLink = recipe.strYoutube.split('watch?v=');
      const embedLink = `${splitedLink[0]}embed/${splitedLink[1]}`;
      recipe.strYoutube = embedLink;
      setCurrentMealRecipe(recipe);
    }
    async function getDefaultRecomendations() {
      const defaultRecomendation = await fetchDrinksDefault();
      setDrinksRecomendation(defaultRecomendation);
    }
    getRecipe();
    getDefaultRecomendations();
  }, [setCurrentMealRecipe, slug]);
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

  const finalizedRecipe = isRecipeDone(currentMealRecipe, doneRecipes);

  return (
    <main>
      {currentMealRecipe && (
        <article>
          <img
            width="300px"
            src={ currentMealRecipe.strMealThumb }
            alt={ currentMealRecipe.strMeal }
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{currentMealRecipe.strMeal}</h2>
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
          <p data-testid="recipe-category">{currentMealRecipe.strCategory}</p>
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
          <p data-testid="instructions">{currentMealRecipe.strInstructions}</p>
          <iframe
            data-testid="video"
            width="1088"
            height="612"
            src={ currentMealRecipe.strYoutube }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture"
            allowFullScreen
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
              {drinksRecomendation && drinksRecomendation.map((drink, index) => (
                index < RECOMENDATION_CARD_SIZE && (
                  <Link
                    key={ drink.idDrink }
                    to={ `/bebidas/${drink.idDrink}` }
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
                        { drink.strDrink }
                      </h1>
                      <img
                        src={ drink.strDrinkThumb }
                        alt={ drink.strDrink }
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
            to={ `/comidas/${currentMealRecipe.idMeal}/in-progress` }
          >
            <button
              data-testid="start-recipe-btn"
              type="button"
              style={ {
                bottom: 0,
                position: 'fixed',
                display: finalizedRecipe ? 'none' : 'block',
              } }
              onClick={ () => setMealsInProgress(currentMealRecipe) }
            >
              {inProgressRecipes().id === currentMealRecipe.idMeal ? (
                'Continuar Receita'
              ) : ('Iniciar Receita')}
            </button>
          </Link>
        </article>
      )}
    </main>
  );
}

export default FoodDetails;
