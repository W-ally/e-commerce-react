import React from 'react';
import { ListGroup, Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = ({ show, handleClose }) => {
   const cartProducts = useSelector(state=>state.cart);
   const navigate= useNavigate();
    const selectProduct=(cartProduct)=>{
      handleClose();
      navigate(`/product/${cartProduct.id}`)
    }

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
        </Offcanvas.Body>
      </Offcanvas>
        </div>
    );
    /*const getDate = purchaseDate => {
        const event = new Date(purchaseDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = event.toLocaleDateString('en-us', options);
        return date;  
    }
*/ 
};

export default Cart;