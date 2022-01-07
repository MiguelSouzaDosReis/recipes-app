function isRecipeDrinkDone(currentDrinkRecipe, doneRecipes) {
  return currentDrinkRecipe && doneRecipes()
    .some((recipes) => recipes.id === currentDrinkRecipe.idDrink);
}

export default isRecipeDrinkDone;
