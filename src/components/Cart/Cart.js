import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = ({ onHideCart }) => {
  const cartContext = useContext(CartContext);
  const { items, totalAmount, addItem, removeItem } = cartContext;
  const addHandler = (item) => {
    addItem({ ...item, amount: 1 });
  };
  const removeHandler = (index) => {
    removeItem(index);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id + item.quantity}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={removeHandler.bind(null, item.id)}
          onAdd={addHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const totalAmt = `Rs. ${totalAmount.toFixed(2)} /-`;
  const hasItems = items.length > 0;
  const onCloseHandler = () => {
    onHideCart();
  };
  return (
    <Modal onClose={onCloseHandler}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmt}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onCloseHandler}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
