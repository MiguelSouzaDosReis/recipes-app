import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import fetchFreeMealAPI from '../services/fetchFreeMealAPI';
import fetchTheCocktailAPI from '../services/fetchTheCocktailAPI';
import AppContext from '../context/AppContext';

function Header({ title, hasSearchButton = true }) {
  const history = useHistory();
  const { setArrayDrinks, setArrayMeals } = useContext(AppContext);
  const [clickSearch, setClickSearch] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [radioValue, setRadioValue] = useState('ingredient');

  async function handleSubmit(e) {
    e.preventDefault();
    if (radioValue === 'firstLetter' && inputValue.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }

    if (title === 'Comidas') {
      const foodsData = await fetchFreeMealAPI({ [radioValue]: inputValue });
      if (foodsData.length === 1) {
        history.push(`/comidas/${foodsData[0].idMeal}`);
      }

      setArrayMeals(foodsData);
      console.log({ foodsData });
    }

    if (title === 'Bebidas') {
      const drinksData = await fetchTheCocktailAPI({ [radioValue]: inputValue });
      if (drinksData.length === 1) {
        history.push(`/bebidas/${drinksData[0].idDrink}`);
      }
      setArrayDrinks(drinksData);
      console.log({ drinksData });
    }
  }

  return (
    <header className="header">
      <h1 data-testid="page-title">{title}</h1>
      <button
        type="button"
        onClick={ () => { history.push('/perfil'); } }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="icone de perfil"
        />
      </button>
      {hasSearchButton && (
        <button
          type="button"
          onClick={ () => { setClickSearch(!clickSearch); } }
        >
          <img data-testid="search-top-btn" src={ searchIcon } alt="icone de pesquisa" />
        </button>
      )}
      {clickSearch && (
        <form onSubmit={ (e) => handleSubmit(e) }>
          <input
            data-testid="search-input"
            type="text"
            placeholder="Pesquisar"
            value={ inputValue }
            onChange={ ({ target }) => setInputValue(target.value) }
          />
          <label htmlFor="ingrediente">
            <input
              id="ingrediente"
              value="ingredient"
              name="form-radio"
              type="radio"
              data-testid="ingredient-search-radio"
              onChange={ ({ target }) => setRadioValue(target.value) }
            />
            Ingrediente
          </label>
          <label htmlFor="nome">
            <input
              id="nome"
              value="name"
              name="form-radio"
              type="radio"
              data-testid="name-search-radio"
              onChange={ ({ target }) => setRadioValue(target.value) }
            />
            Nome
          </label>
          <label htmlFor="primeira-letra">
            <input
              id="primeira-letra"
              value="firstLetter"
              name="form-radio"
              type="radio"
              data-testid="first-letter-search-radio"
              onChange={ ({ target }) => setRadioValue(target.value) }
            />
            Primeira letra
          </label>
          <button
            data-testid="exec-search-btn"
            type="submit"
          >
            Buscar
          </button>
        </form>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hasSearchButton: PropTypes.bool,
};

Header.defaultProps = {
  hasSearchButton: true,
};

export default Header;
