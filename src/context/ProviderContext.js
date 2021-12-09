import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const ProviderContext = ({ children }) => {
  const [mealsToken, setMealsToken] = useState('');
  const [cocktailsToken, setcocktailsToken] = useState('');
  const [user, setUser] = useState({ email: '' });
  const [drinks, setDrinks] = useState([]);
  const [meals, setMeals] = useState([]);
  /* const [doneRecipes, setDoneRecipes] = useState([[{
    id: '',
    type: '',
    area: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: '',
}]]);
 */

  useEffect(() => {
    setMealsToken(localStorage.getItem('mealsToken'));
    setcocktailsToken(localStorage.getItem('cocktailsToken'));
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const setArrayMeals = (arrayMeals) => {
    setMeals(arrayMeals);
  };

  const setArrayDrinks = (arrayDrink) => {
    setDrinks(arrayDrink);
  };

  const allContext = {
    mealsToken,
    cocktailsToken,
    user,
    meals,
    drinks,
    setMealsToken,
    setcocktailsToken,
    setArrayDrinks,
    setArrayMeals,
  };

  return (
    <AppContext.Provider value={ allContext }>
      {children}
    </AppContext.Provider>
  );
};

ProviderContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderContext;
