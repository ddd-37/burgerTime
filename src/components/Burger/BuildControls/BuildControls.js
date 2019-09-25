import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(el => {
      return (
        <BuildControl
          key={el.label}
          label={el.label}
          more={() => props.addIngredient(el.type)}
          remove={() => props.removeIngredient(el.type)}
          disabled={props.disabled[el.type]}
        />
      );
    })}
    <button className={classes.OrderButton} disabled={!props.purchasable}>
      ORDER NOW
    </button>
  </div>
);

export default buildControls;
