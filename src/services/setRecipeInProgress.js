export const setMealsInProgress = (meal) => {
  const newRecipe = {
    id: meal.idMeal,
    type: 'meal',
    area: meal.strArea,
    category: meal.strCategory,
    name: meal.strMeal,
    image: meal.strMealThumb,
    doneDate: '',
    tags: '',
  };
  const oldStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  localStorage
    .setItem('inProgressRecipes', JSON.stringify({ ...oldStorage, meals: newRecipe }));
};

export const setDrinkInProgress = (drink) => {
  const newRecipeDrink = {
    id: drink.idDrink,
    type: 'drink',
    area: drink.strArea,
    category: drink.strCategory,
    alcoholicOrNot: drink.strAlcoholic,
    name: drink.strDrink,
    image: drink.strDrinkThumb,
    doneDate: '',
    tags: '',
  };
  const oldStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  localStorage
    .setItem('inProgressRecipes', JSON
      .stringify({ ...oldStorage, cocktails: newRecipeDrink }));
};
