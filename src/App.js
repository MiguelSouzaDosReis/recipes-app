import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import FindFoods from './Pages/FindFoods';
import FindDrinks from './Pages/FindDrinks';
import Explorer from './Pages/Explorer';
import ExploreDrink from './Pages/ExploreDrinks';
import ExploreFoods from './Pages/ExploreFoods';
import ExploreDrinksByIngredients from './Pages/ExploreDrinksByIngredients';
import ExploreFoodsByIngredients from './Pages/ExploreFoodsByIngredients';
import Profile from './Pages/Profile';
import ExploreFoodsArea from './Pages/ExploreFoodsArea';
import RecipesDone from './Pages/RecipesDone';
import FavoriteRecipes from './Pages/FavoriteRecipes';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ FindFoods } />
        <Route path="/bebidas" component={ FindDrinks } />
        <Route path="/explorar" component={ Explorer } />
        <Route path="/explorar/comidas" component={ ExploreFoods } />
        <Route path="/explorar/bebidas" component={ ExploreDrink } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodsByIngredients }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinksByIngredients }
        />
        <Route path="/explorar/comidas/area" component={ ExploreFoodsArea } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" component={ RecipesDone } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
