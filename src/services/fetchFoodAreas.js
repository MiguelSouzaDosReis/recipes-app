const fetchFoodAreas = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await response.json();
    return data.meals;
  } catch (err) {
    return null;
  }
};

export default fetchFoodAreas;
