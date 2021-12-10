const fetchDrinksCategories = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data.drinks;
  } catch (err) {
    return null;
  }
};

export default fetchDrinksCategories;
