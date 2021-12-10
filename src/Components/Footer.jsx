import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
    >
      <button
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/comidas') }
        type="button"
      >
        <img src={ mealIcon } alt="imagem de comida" />
      </button>
      <button
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/bebidas') }
        type="button"
      >
        <img src={ drinkIcon } alt="Bebidas" />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explorar') }
      >
        <img src={ exploreIcon } alt="Explorar" />
      </button>
    </footer>
  );
}

export default Footer;
