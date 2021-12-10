import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer
      style={ { position: 'fixed', bottom: 0 } }
      data-testid="footer"
    >
      <button
        onClick={ () => history.push('/comidas') }
        type="button"
      >
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="imagem de comida"
        />
      </button>
      <button
        onClick={ () => history.push('/bebidas') }
        type="button"
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Bebidas"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explorar') }
      >
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="Explorar"
        />
      </button>
    </footer>
  );
}

export default Footer;
