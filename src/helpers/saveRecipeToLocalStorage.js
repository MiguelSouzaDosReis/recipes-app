function saveRecipeToLocalStorage(currentRecipe, type) {
  let element = [];
  if (type === 'comida') {
    const { idMeal, strMeal, strCategory, strArea, strMealThumb } = currentRecipe;

    if (localStorage.getItem('favoriteRecipes')) {
      element = JSON.parse(localStorage.getItem('favoriteRecipes'));
    }

    if (element.find((recipe) => recipe.id === idMeal)) {
      element = element.filter((elem) => elem.id !== idMeal);
    } else {
      element = [...element, {
        id: idMeal,
        type,
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      }];
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(element));
  }
  if (type === 'bebida') {
    const { idDrink, strDrink, strCategory, strAlcoholic, strDrinkThumb } = currentRecipe;

    if (localStorage.getItem('favoriteRecipes')) {
      element = JSON.parse(localStorage.getItem('favoriteRecipes'));
    }

    if (element.find((recipe) => recipe.id === idDrink)) {
      element = element.filter((elem) => elem.id !== idDrink);
    } else {
      element = [...element, {
        id: idDrink,
        type,
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      }];
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(element));
  }
}

export default saveRecipeToLocalStorage;
