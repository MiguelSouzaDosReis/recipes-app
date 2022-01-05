import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchMealsDefault from '../services/fetchMealsDefault';
import fetchDrinksDefault from '../services/fetchDrinksDefault';
import fetchFoodCategories from '../services/fetchFoodCategories';
import fetchDrinkCategories from '../services/fetchDrinksCategories';
import fetchDrinksByCategory from '../services/fetchDrinksByCategory';
import fetchFoodsByCategory from '../services/fetchFoodsByCategory';

const ProviderContext = ({ children }) => {
  const [mealsToken, setMealsToken] = useState('');
  const [cocktailsToken, setcocktailsToken] = useState('');
  const [user, setUser] = useState({ email: '' });
  const [drinks, setDrinks] = useState([]);
  const [meals, setMeals] = useState([]);
  const [isFetchLoaded, setFetchLoaded] = useState(false);
  const [foodCategories, setFoodCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [drinkNameCategory, setDrinkNameCategory] = useState('');
  const [mealNameCategory, setMealNameCategory] = useState('');
  const [currentMealRecipe, setCurrentMealRecipe] = useState({});
  const [currentDrinkRecipe, setCurrentDrinkRecipe] = useState({});
  const [doneMeals, setDoneMeals] = useState([{ id: '' }]);

  useEffect(() => {
    const fetchDefault = async () => {
      setFetchLoaded(false);
      const dataMeals = await fetchMealsDefault();
      const dataDrinks = await fetchDrinksDefault();
      setMeals(dataMeals);
      setDrinks(dataDrinks);
    };
    fetchDefault().then(() => setFetchLoaded(true));
  }, []);

  useEffect(() => {
    setMealsToken(localStorage.getItem('mealsToken'));
    setcocktailsToken(localStorage.getItem('cocktailsToken'));
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  useEffect(() => {
    const getFoodCategories = async () => {
      const foodCategoriesList = await fetchFoodCategories();
      setFoodCategories(foodCategoriesList);
    };
    getFoodCategories();
  }, []);

  useEffect(() => {
    const getDrinksCategories = async () => {
      const drinkCategoriesList = await fetchDrinkCategories();
      setDrinkCategories(drinkCategoriesList);
    };
    getDrinksCategories();
  }, []);

  useEffect(() => {
    const getDrinkCategory = async () => {
      setFetchLoaded(false);
      if (drinkNameCategory === '') {
        const drinkCategory = await fetchDrinksDefault();
        setDrinks(drinkCategory);
      }
      if (drinkNameCategory !== '') {
        const drinkCategory = await fetchDrinksByCategory(drinkNameCategory);
        setDrinks(drinkCategory);
      }
    };
    getDrinkCategory().then(() => setFetchLoaded(true));
  }, [drinkNameCategory]);

  useEffect(() => {
    const getMealCategory = async () => {
      setFetchLoaded(false);
      if (mealNameCategory === '') {
        const mealCategory = await fetchMealsDefault();
        setMeals(mealCategory);
      }
      if (mealNameCategory !== '') {
        const mealCategory = await fetchFoodsByCategory(mealNameCategory);
        setMeals(mealCategory);
      }
    };
    getMealCategory().then(() => setFetchLoaded(true));
  }, [mealNameCategory]);

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
    foodCategories,
    drinkCategories,
    drinkNameCategory,
    mealNameCategory,
    isFetchLoaded,
    currentMealRecipe,
    currentDrinkRecipe,
    doneMeals,
    setDrinkNameCategory,
    setMealNameCategory,
    setMealsToken,
    setcocktailsToken,
    setArrayDrinks,
    setArrayMeals,
    setCurrentMealRecipe,
    setCurrentDrinkRecipe,
    setDoneMeals,
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
