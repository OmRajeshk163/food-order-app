import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const cartContext = useContext(CartContext);
  const { addItem } = cartContext;
  const { name, description, id, price } = props.meal;
  const mealPrice = `Rs. ${price.toFixed(2)} /-`;

  const onAddHandler = (value) =>
    addItem({ id: id, name: name, price: price, amount: value });

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{mealPrice}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddHandler={onAddHandler} />
      </div>
    </li>
  );
};

export default MealItem;
