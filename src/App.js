import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import ItemCard from "./components/itemCard/ItemCard";
import AddFoodItem from "./components/addIFoodtem/AddFoodItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CartAction } from "./Redux/CartReducer";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const {items} = useSelector((state) => state.cart);
  const dispatch = useDispatch();

const url = process.env.REACT_APP_URL;

  const showCartHandler = () => {
    dispatch(CartAction.showCart())
  }

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const {data} = await axios.get(
          `${url}/items`
        );
        dispatch(CartAction.addToList(data));
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const getItems = async () => {
      try {
        const {data} = await axios.get(
          `${url}/cart`
        );
        let totalPrice = 0;
        data.forEach((element) => {
          totalPrice += element.price;
        });
        dispatch(CartAction.addToModal({data, totalPrice}));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getItems();
  }, []);

  const navigate = useNavigate();

  const handleShowAddItem = () => {
    navigate('/add')
  }

  return (
    // <CartProvider>
    <div>
       <div className="header">
        <h1>React Meals</h1>
          <div style={{display:"flex",gap:'15px'}}>
          <button className="headerButton" onClick={handleShowAddItem}>
                Add Item
            </button>
            <button className="headerButton" onClick={showCartHandler}>
                Your Cart<span>{items.length}</span>
            </button>  
          </div>
      </div>
      <Routes>
        <Route path="/" element={<><Header cartItems={cartItems}/><ItemCard addToCart={addToCart} /></>}></Route>
        <Route path="/add" element={<AddFoodItem/>}/>
        <Route path="*" element={<Navigate to={"/"}/>}/>
         {/* <Header cartItems={cartItems} /> */}
         {/* <AddFoodItem/> */}
         {/* <ItemCard addToCart={addToCart} /> */}
      </Routes>
    </div>

    // </CartProvider>
  );
}

export default App;
