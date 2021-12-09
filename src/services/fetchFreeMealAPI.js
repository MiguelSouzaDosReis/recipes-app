const searchByIngredient = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data;
};

const searchByName = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data;
};

const searchByFirstLetter = async (firstLetter) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();
  return data;
};

const fetchFreeMealAPI = async ({ ingredient, name, firstLetter }) => {
  console.log(ingredient, name, firstLetter);
  if (ingredient) {
    const data = await searchByIngredient(ingredient);
    return data;
  }

  if (name) {
    const data = await searchByName(name);
    return data;
  }

  if (firstLetter) {
    const data = await searchByFirstLetter(firstLetter);
    return data;
  }
};

export default fetchFreeMealAPI;
