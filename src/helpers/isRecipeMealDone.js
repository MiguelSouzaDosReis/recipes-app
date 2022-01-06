function isRecipeMealDone(currentMealRecipe, doneRecipes) {
  return currentMealRecipe && doneRecipes()
    .some((recipes) => recipes.id === currentMealRecipe.idMeal);
}

export default isRecipeMealDone;
