import React, { useState } from 'react';
import shareButtonIcon from '../images/shareIcon.svg';

const TIME_TO_HIDE_COPY_MESSAGE = 2000;

function ShareButton() {
  const [clipBoard, setClipBoard] = useState(false);

  async function handleURLCopy() {
    const currentURL = window.location.href;
    const textToCopy = currentURL
      .match(/in-progress/g) ? currentURL.replace(/\/in-progress/g, '') : currentURL;
    console.log(textToCopy);
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
          src={ shareButtonIcon }
          alt="Compartilhar"
        />
      </button>
      {clipBoard && <p>Link copiado!</p>}
    </>
  );
}

export default ShareButton;
