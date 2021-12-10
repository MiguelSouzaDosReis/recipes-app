const fetchFoodsByCategory = async (category) => {
  try {
    const response = await
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals;
  } catch (err) {
    return null;
  }
};

export default fetchFoodsByCategory;
