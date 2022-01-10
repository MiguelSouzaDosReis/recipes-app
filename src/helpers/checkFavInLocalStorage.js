const checkFavInLocalStorage = (id) => {
  let element = [];

  if (localStorage.getItem('favoriteRecipes')) {
    element = JSON.parse(localStorage.getItem('favoriteRecipes'));
  }

  if (element.find((recipe) => recipe.id === id)) {
    element = element.filter((elem) => elem.id !== id);
  }

  localStorage.setItem('favoriteRecipes', JSON.stringify(element));
};

export default checkFavInLocalStorage;
