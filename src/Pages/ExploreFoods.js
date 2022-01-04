import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function ExploreFoods() {
  return (
    <main>
      <Header title="Explorar Comidas" hasSearchButton={ false } />
      <h1>ExploreFoods</h1>
      <Footer />
    </main>
  );
}

export default ExploreFoods;
