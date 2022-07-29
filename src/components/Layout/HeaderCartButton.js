import React, { useContext, useState, useEffect } from "react";
import CartIcon from "../../assets/icons/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = ({ onClick }) => {
  const cartContext = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  console.log("cartContext", cartContext);
  const numberOfCartItems = cartContext.items.reduce(
    (currNum, item) => currNum + +item.amount,
    0
  );
  useEffect(() => {
    if (cartContext.items.length > 0) setBtnIsHighlighted(true);
    const timer = setTimeout(() => setBtnIsHighlighted(false), 300);
    return () => clearTimeout(timer);
  }, [cartContext.items]);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  return (
    <button className={btnClasses} onClick={() => onClick()}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{+numberOfCartItems.toFixed(2)}</span>
    </button>
  );
};

export default HeaderCartButton;
