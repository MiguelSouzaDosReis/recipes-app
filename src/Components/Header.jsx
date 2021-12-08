import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <header className="header">
      <h1 data-testid="page-title">title</h1>
      <button
        type="button"
        data-testid="profile-top-btn"
      >
        <img src={ profileIcon } alt="icone de perfil" />
      </button>
      <button
        type="button"
        data-testid="search-top-btn"
      >
        <img src={ searchIcon } alt="icone de pesquisa" />
      </button>
    </header>
  );
}

export default Header;
