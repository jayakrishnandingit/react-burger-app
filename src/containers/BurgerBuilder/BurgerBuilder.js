import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
	salad: 1.0,
	cheese: 0.5,
	bacon: 0.8,
	meat: 1.5
}


class BurgerBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ingredients: {
				salad: 0,
				bacon: 0,
				cheese: 0,
				meat: 0
			},
			totalPrice: 4,
			purchasable: false,
			checkout: false
		}
	}

	// implementing arrow functions helps in avoiding
	// the error of `this` becoming undefined
	// when we use the function in event handlers.
	checkoutHandler = () => {
		this.setState({checkout: true});
	}

	updatePurchaseState  = (ingredients) => {
		let sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((runningSum, curr) => {
				return runningSum + curr;
			}, 0);
		this.setState({purchasable: sum > 0});
	}

	addIngredientHandler = (type) => {
		const newCount = this.state.ingredients[type] + 1;
		let updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = newCount;

		const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		if (this.state.ingredients[type] <= 0) {
			return;
		}
		const newCount = this.state.ingredients[type] - 1;
		let updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = newCount;

		const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	render () {
		let disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
		}
		return (
			<Aux>
				<Modal show={this.state.checkout}>
					<OrderSummary ingredients={this.state.ingredients} />
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
					checkout={this.checkoutHandler}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
