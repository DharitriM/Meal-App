import {createContext} from "react";

const CartContext = createContext({
  items: [],
  totalPrice: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  showModal: false,
  openCart: () => {},
  closeCart: () => {},
});

export default CartContext;