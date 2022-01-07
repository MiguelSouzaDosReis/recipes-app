export const setMealsInProgress = ({ id, ingredientsArray }) => {
  const newRecipe = {
    [id]: ingredientsArray,
  };
  const oldStorage = localStorage
    .getItem('inProgressRecipes') !== null ? JSON
      .parse(localStorage.getItem('inProgressRecipes')) : { meals: {} };
  localStorage
    .setItem('inProgressRecipes', JSON.stringify({
      ...oldStorage,
      meals: { ...oldStorage.meals, ...newRecipe } }));
};

export const setDrinkInProgress = ({ id, ingredientsArray }) => {
  const newRecipeDrink = {
    [id]: ingredientsArray,
  };
  const oldStorage = localStorage
    .getItem('inProgressRecipes') !== null ? JSON
      .parse(localStorage.getItem('inProgressRecipes')) : { cocktails: {} };
  localStorage
    .setItem('inProgressRecipes', JSON
      .stringify({
        ...oldStorage,
        cocktails: { ...oldStorage.cocktails, ...newRecipeDrink },
      }));
};
