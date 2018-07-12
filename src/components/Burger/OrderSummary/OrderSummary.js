import React from 'react';
import Aux from '../../../hoc/Aux';


const orderSummary = (props) => {
	const ingredientList = Object.keys(props.ingredients)
		.map(igKey => {
			return (
				<li key={igKey}>
					<span style={{textTransform: 'capitalize'}}>{igKey}: </span>{props.ingredients[igKey]}
				</li>
			)
		});
	return (
		<Aux>
			<h3>Order Summary</h3>
			<p>A delicious burger with following ingredients:</p>
			<ul>
				{ingredientList}
			</ul>
			<p>Continue to Checkout?</p>
		</Aux>
	)
}

export default orderSummary;
