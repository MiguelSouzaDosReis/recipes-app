import React from 'react';
import PropTypes from 'prop-types';

function CategoriesButtons({ categories, onClick }) {
  return (
    <>
      {categories.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          name={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ onClick }
        >
          { strCategory }
        </button>
      ))}
    </>
  );
}

CategoriesButtons.propTypes = {
  categories: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoriesButtons;
