import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.4,
  cheese: 0.75,
  meat: 1.4,
  bacon: 0.96
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    purchasable: false,
    totalPrice: 4
  };

  updatePurchaseState = updatedIngredients => {
    const sum = Object.keys(updatedIngredients)
      .map(igKey => {
        return updatedIngredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  };

  //METHODS TO ADD AND REMOVE INGREDIENTS
  addIngredientHandler = type => {
    // Add 1 to our selected ingredient
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    // Create are new state object essentially
    const updatedIngredients = {
      ...this.state.ingredients
    };

    // Edit the new state object
    updatedIngredients[type] = updatedCount;

    // Find the price for the new ingredient
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    // Set the state
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    // Add 1 to our selected ingredient
    const oldCount = this.state.ingredients[type];

    // We need to handle negative numbers, meaning we do not allow them
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;

    // Create are new state object essentially
    const updatedIngredients = {
      ...this.state.ingredients
    };

    // Edit the new state object
    updatedIngredients[type] = updatedCount;

    // Find the price for the new ingredient
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceDeduction;

    // Set the state
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });

    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    // We need to be able to disable buttons if the value of the ingredient is zero
    const disabledInfo = {
      ...this.state.ingredients // Copy our state object
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // If the key is equal to or less than zero set the new disabledInfo object key: value to false
    }
    return (
      <>
        <div>
          <Burger ingredients={this.state.ingredients} />
        </div>
        <BuildControls
          price={this.state.totalPrice}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
        />
      </>
    );
  }
}

export default BurgerBuilder;
