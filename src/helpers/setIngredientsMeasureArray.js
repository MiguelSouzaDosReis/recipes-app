export default function setIngredientsMeasureArray(
  currentRecipe, ingredientsArray, measureArray, MAX_INGREDIENT_SIZE,
) {
  if (currentRecipe) {
    for (let i = 1; i <= MAX_INGREDIENT_SIZE; i += 1) {
      if (currentRecipe[`strIngredient${i}`]) {
        ingredientsArray.push(currentRecipe[`strIngredient${i}`]);
      }
      if (currentRecipe[`strIngredient${i}`]) {
        measureArray.push(currentRecipe[`strMeasure${i}`]);
      }
    }
  }
}
