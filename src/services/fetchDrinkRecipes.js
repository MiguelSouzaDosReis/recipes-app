const fetchDrinkRecipes = async (drinkID) => {
  try {
    const response = await
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`);
    const data = await response.json();
    return data.drinks[0];
  } catch (error) {
    return null;
  }
};

export default fetchDrinkRecipes;
