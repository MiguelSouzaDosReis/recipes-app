import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, hasSearchButton = true }) {
  const history = useHistory();
  const [clickSearch, setClickSearch] = useState(false);

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
        <form onSubmit={ (e) => e.preventDefault() }>
          <input data-testid="search-input" type="text" />
          <label htmlFor="ingrediente">
            Ingrediente
            <input
              id="ingrediente"
              value="ingrediente"
              name="form-radio"
              type="radio"
              data-testid="ingredient-search-radio"
            />
          </label>
          <label htmlFor="nome">
            Nome
            <input
              id="nome"
              value="nome"
              name="form-radio"
              type="radio"
              data-testid="name-search-radio"
            />
          </label>
          <label htmlFor="primeira-letra">
            Primeira letra
            <input
              id="primeira-letra"
              value="primeira letra"
              name="form-radio"
              type="radio"
              data-testid="first-letter-search-radio"
            />
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Header.defaultProps = {
  hasSearchButton: true,
};

export default Header;
