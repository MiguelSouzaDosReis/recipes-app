import React from 'react';
import { useParams } from 'react-router-dom';

function FoodRecipeInProcess() {
  const { meal } = useParams();
  console.log(meal);
  return (
    <div>a</div>
  );
}
export default FoodRecipeInProcess;
