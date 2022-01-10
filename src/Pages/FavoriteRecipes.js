import React from 'react';
import Header from '../Components/Header';
import RecipeFavoriteCard from '../Components/RecipeFavoriteCard';

function FavoriteRecipes() {
  return (
    <main>
      <Header
        title="Receitas Favoritas"
        hasSearchButton={ false }
      />
      <h1>Favorite Recipes</h1>
      <RecipeFavoriteCard />
    </main>
  );
}

export default FavoriteRecipes;
