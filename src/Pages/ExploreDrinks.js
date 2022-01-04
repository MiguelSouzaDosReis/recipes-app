import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function ExploreDrink() {
  return (
    <main>
      <Header
        title="Explorar Bebidas"
        hasSearchButton={ false }
      />
      <h1>Explore Drinks</h1>
      <Footer />
    </main>
  );
}

export default ExploreDrink;
