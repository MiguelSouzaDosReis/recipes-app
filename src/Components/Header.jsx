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
      {clickSearch && <input data-testid="search-input" type="text" />}
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
