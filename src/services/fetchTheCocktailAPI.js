const searchByIngredient = async (ingredient) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data;
};

const searchByName = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data;
};

const searchByFirstLetter = async (firstLetter) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();
  return data;
};

const fetchTheCocktailAPI = async ({ ingredient, name, firstLetter }) => {
  if (ingredient) {
    try {
      const data = await searchByIngredient(ingredient);
      return data.drinks;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  if (name) {
    try {
      const data = await searchByName(name);
      return data.drinks;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  if (firstLetter) {
    try {
      const data = await searchByFirstLetter(firstLetter);
      return data.drinks;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};

export default fetchTheCocktailAPI;
