import React from 'react';
import Header from '../Components/Header';

function FavoriteRecipes() {
  return (
    <main>
      <Header
        title="Receitas Favoritas"
        sSearchButton={ false }
      />
      <h1>Favorite Recipes</h1>
    </main>
  );
}

export default FavoriteRecipes;
