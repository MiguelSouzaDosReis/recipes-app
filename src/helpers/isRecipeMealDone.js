function isRecipeMealDone(currentMealRecipe, doneRecipes) {
  return doneRecipes().some((recipes) => recipes.id === currentMealRecipe.idMeal);
}

export default isRecipeMealDone;
