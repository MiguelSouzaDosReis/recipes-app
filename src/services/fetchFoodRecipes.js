const fetchFoodRecipe = async (foodID) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodID}`);
    const data = await response.json();
    return data.meals[0];
  } catch (err) {
    return null;
  }
};

export default fetchFoodRecipe;
