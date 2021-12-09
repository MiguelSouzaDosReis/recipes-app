import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, hasSearchButton = true }) {
  return (
    <header className="header">
      <h1 data-testid="page-title">{title}</h1>
      <button
        type="button"
      >
        <img data-testid="profile-top-btn" src={ profileIcon } alt="icone de perfil" />
      </button>
      {hasSearchButton && (
        <button
          type="button"
        >
          <img data-testid="search-top-btn" src={ searchIcon } alt="icone de pesquisa" />
        </button>
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
