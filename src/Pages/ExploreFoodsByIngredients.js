import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function ExploreFoodsByIngredients() {
  return (
    <main>
      <Header title="Explorar Ingredientes" hasSearchButton={ false } />
      <h1>Explore Food By Ingredients</h1>
      <Footer />
    </main>
  );
}

export default ExploreFoodsByIngredients;
