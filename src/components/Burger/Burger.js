import React from 'react';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
import classes from './Burger.css';


const burger = (props) => {
	let ingredientList = Object.keys(props.ingredients)
		.map(igKey => {
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return <BurgerIngredient key={igKey + i} type={igKey} />
			});
		})
		.reduce((rootArray, currEl) => {
			return rootArray.concat(currEl);
		}, []);

	if (ingredientList.length === 0) {
		ingredientList = <p>Please start adding ingredients!</p>;
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{ingredientList}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
}

export default burger;
