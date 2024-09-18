import { useReducer } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {
    const defaultCart = {
        items: [],
        totalPrice: 0,
        showModal: false,
    }

    const cartReducer = (state, action) => {
            if(action.type === 'Add'){
                const existingItemIndex = state.items.findIndex((item)=>item.id === action.item.id);
                let updatedTotalPrice;

                const existingItem = state.items[existingItemIndex];
                let updatedItem;
                let updatedItems;
                if(existingItem){
                    updatedItem = {
                        ...existingItem,
                        amount: existingItem.amount +1,
                    }
                    updatedTotalPrice= state.totalPrice+(+action.item.price);
                    updatedItems=[...state.items];
                    updatedItems[existingItemIndex] = updatedItem;
                }else{
                    updatedItems = [action.item, ...state.items];
                    updatedTotalPrice= state.totalPrice+(action.item.price*action.item.amount);
                }
                return {
                    items: updatedItems,
                    totalPrice: +updatedTotalPrice,
                    showModal: state.showModal,
                }
            }
            if(action.type === 'remove'){
                const existingItemIndex = state.items.findIndex((item)=>item.id === action.id);
                const existingItem = state.items[existingItemIndex];
                let updatedTotalPrice = state.totalPrice - existingItem.price;
                let updatedItems;
                if(existingItem.amount === 1){
                    updatedItems = state.items.filter((item) => item.id !== action.id);
                }else{
                    const updatedItem = {
                        ...existingItem,
                        amount: existingItem.amount -1,
                    }
                    updatedItems = [...state.items];
                    updatedItems[existingItemIndex] = updatedItem;
                }
                return {
                    items: updatedItems,
                    totalPrice: updatedTotalPrice,
                    showModal: state.showModal,
                }
            }
            
            if(action.type === 'showCart'){
                return {
                    items: state.items,
                    totalPrice: state.totalPrice,
                    showModal: true,
                }
            }
            if(action.type === 'hideCart'){
                return {
                    items: state.items,
                    totalPrice: state.totalPrice,
                    showModal: false,
                }
            }
            return defaultCart;
        };
    
    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCart);

    const addItemHandler = (item) => {
        dispatchCart ({type: 'Add', item: item});
    }
    const removeItemHandler = (id) => {
        dispatchCart ({type: 'remove', id: id});
    }
    const openCartHandler = () => {
        dispatchCart ({type: 'showCart'})
    }
    const closeCartHandler = () => {
        dispatchCart ({type: 'hideCart'})
    }

    const cartContext = {
        items: cartState.items,
        totalPrice: cartState.totalPrice,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        showModal: cartState.showModal,
        openCart: openCartHandler,
        closeCart: closeCartHandler, 
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};
export default CartProvider;