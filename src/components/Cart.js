import React, { useEffect } from 'react';
import { ListGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { buy, getCart } from "../store/slices/cart.slice";

const Cart = ({ show, handleClose }) => {
   const cartProducts = useSelector(state=>state.cart);
   const navigate= useNavigate();
   const dispatch = useDispatch();
   
    const selectProduct=(cartProduct)=>{
      handleClose();
      navigate(`/product/${cartProduct.id}`)
    }

    useEffect(()=>{
    dispatch(getCart())
    },[dispatch])

    return (
        <div>
            
      <Offcanvas show={show} onHide={handleClose}  placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ListGroup variant="flush">
            {cartProducts.map((cartProduct) => (
              <div key={cartProduct.id}>

              <ListGroup.Item onClick={() => selectProduct(cartProduct)}>
                <h5>{cartProduct.title} </h5>
                <p>${cartProduct.price} </p>
                <p><b>Quantity:</b>{cartProduct.productsInCart.quantity} </p>
              </ListGroup.Item>


              </div>
            ))}
          </ListGroup>
        <div  className='purchase-total'>
           <span>Total</span>
          <h3>US$ 0</h3>

        </div>

          
          <button  className="btn__purchase-2" onClick={()=>dispatch(buy())}>
          checkout
        </button>
        </Offcanvas.Body>
        
      </Offcanvas>

      <div>
       
      </div>
  </div>
    );
  

};

export default Cart;