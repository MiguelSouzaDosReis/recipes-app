import PropTypes from 'prop-types';
import React from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton({ handleFavClick, isFav, setIsFav }) {
  return (
    <button
      type="button"
      onClick={ () => handleFavClick(isFav, setIsFav) }
    >
      <img
        src={ isFav ? blackHeartIcon : whiteHeartIcon }
        alt={ isFav ? 'coração preto' : 'coração branco' }
        data-testid="favorite-btn"
      />

    </button>
  );
}

FavoriteButton.propTypes = {
  handleFavClick: PropTypes.func.isRequired,
  isFav: PropTypes.bool.isRequired,
  setIsFav: PropTypes.func.isRequired,
};

export default FavoriteButton;
