function isRecipeDone(currentDrinkRecipe, doneRecipes) {
  return doneRecipes().some((recipes) => recipes.id === currentDrinkRecipe.idDrink);
}

export default isRecipeDone;
