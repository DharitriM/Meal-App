// import { useContext } from "react";
import classes from "./CartModal.module.css";
import ReactDOM  from "react-dom";
// import CartContext from "../../Context/CartContext";

const Backdrop = (props) => {

// const {closeCart} = useContext(CartContext)

  return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className='content'>{props.children}</div>
    </div>
  );
};

const CartModal = (props) => {
  const portal = document.getElementById("overLays");
  
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portal)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portal
      )}
    </>
  );
};

export default 
CartModal;