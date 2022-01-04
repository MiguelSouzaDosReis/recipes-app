import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function ExploreDrinksByIngredients() {
  return (
    <main>
      <Header
        title="Explorar Ingredientes"
        hasSearchButton={ false }
      />
      <h1>Explore Drinks by Ingredients</h1>
      <Footer />
    </main>
  );
}

export default ExploreDrinksByIngredients;
