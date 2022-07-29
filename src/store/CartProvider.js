import { useReducer } from "react";
import CartContext from "./cart-context";

const Types = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
};
const initialCartState = {
  totalAmount: 0,
  items: [],
};

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case Types.ADD_TO_CART:
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      let updatedItems;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingItem = state.items[existingItemIndex];

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }
      console.log("updatedItems", updatedItems);

      return { items: updatedItems, totalAmount: updatedTotalAmount };
    case Types.REMOVE_FROM_CART: {
      let updatedItems;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const existingItem = state.items[existingItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.payload);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      }
      console.log("updatedTotalAmount", updatedTotalAmount);
      return {
        totalAmount: +updatedTotalAmount,
        items: updatedItems ?? [],
      };
    }
    default:
      return state;
  }
};
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartState
  );
  const addCartItemHandler = (item) => {
    dispatchCartAction({ type: Types.ADD_TO_CART, payload: item });
  };
  const removeCartItemHandler = (index) => {
    dispatchCartAction({ type: Types.REMOVE_FROM_CART, payload: index });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addCartItemHandler,
    removeItem: removeCartItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
