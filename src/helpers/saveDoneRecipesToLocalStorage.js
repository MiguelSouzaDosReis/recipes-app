const newDate = () => {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; // months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

function saveDoneRecipesToLocalStorage(currentRecipe, type) {
  const oldLocalStorage = localStorage.getItem('doneRecipes') !== null
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];

  const recipeToSave = {
    id: currentRecipe.idDrink ? currentRecipe.idDrink : currentRecipe.idMeal,
    type,
    area: currentRecipe.strArea,
    category: currentRecipe.strCategory,
    alcoholicOrNot: currentRecipe.strAlcoholic || '',
    name: currentRecipe.drink ? currentRecipe.drink : currentRecipe.strMeal,
    image: currentRecipe.strDrinkThumb
      ? currentRecipe.strDrinkThumb : currentRecipe.strMealThumb,
    doneDate: newDate(),
    tags: currentRecipe.strTags
      ? currentRecipe.strTags : currentRecipe.strTags.split(','),
  };

  localStorage
    .setItem('doneRecipes', JSON
      .stringify([...oldLocalStorage, recipeToSave]));
}

export default saveDoneRecipesToLocalStorage;
