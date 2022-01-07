function populateArrays(currentDrinkRecipe, ingredientsArray, measureArray, MAX) {
  for (let i = 1; i <= MAX; i += 1) {
    if (currentDrinkRecipe[`strIngredient${i}`]) {
      ingredientsArray.push(currentDrinkRecipe[`strIngredient${i}`]);
    }
    if (currentDrinkRecipe[`strIngredient${i}`]) {
      measureArray.push(currentDrinkRecipe[`strMeasure${i}`]);
    }
  }
}

export default populateArrays;
