import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareButtonIcon from '../images/shareIcon.svg';

const TIME_TO_HIDE_COPY_MESSAGE = 2000;

function ShareButton({ type, id, index }) {
  const [clipBoard, setClipBoard] = useState(false);
  const [urlPath, setUrlPath] = useState('');

  useEffect(() => {
    if (type && id) {
      const getUrlPath = () => {
        const url = window.location.href
          .replace(/\/receitas-favoritas/g, `/${type}s/${id}`)
          .replace(/\/receitas-feitas/g, `/${type}s/${id}`);
        setUrlPath(url);
      };
      getUrlPath();
    }
  });

  async function handleURLCopy() {
    const currentURL = urlPath || window.location.href;
    const textToCopy = currentURL
      .match(/in-progress/g) ? currentURL.replace(/\/in-progress/g, '') : currentURL;
    if ('clipboard' in navigator) {
      return navigator.clipboard.writeText(textToCopy);
    }
    return document.execCommand('copy', true, textToCopy);
  }

  const handleShareButtonClick = () => {
    handleURLCopy()
      .then(() => {
        setClipBoard(true);
        setTimeout(() => {
          setClipBoard(false);
        }, TIME_TO_HIDE_COPY_MESSAGE);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <button
        type="button"
        onClick={ handleShareButtonClick }
        data-testid="share-btn"
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareButtonIcon }
          alt="Compartilhar"
        />
      </button>
      {clipBoard && <p>Link copiado!</p>}
    </>
  );
}

ShareButton.defaultProps = {
  type: '',
  id: '',
  index: '',
};

ShareButton.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.number,
};

export default ShareButton;
