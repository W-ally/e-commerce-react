import React, { useEffect, useState } from 'react';
import {  Container, Nav, Navbar, } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { getCart } from '../store/slices/cart.slice';
import Cart from './Cart';
import { useNavigate } from "react-router-dom";


const NavBar = () => {
  const logout = () => localStorage.setItem("token", "");
   
   const dispach = useDispatch();
   const [show, setShow] = useState(false);
   const navigate = useNavigate();

  const handleClose = () => setShow(false);
 
  const handleShow = () => {
    const token = localStorage.getItem("token");

    if (token) {
      setShow(true);
    } else {
      navigate("/login");
    }
  };

   useEffect(()=>{
    dispach(getCart())
   },[dispach]);
     
    return (
        <div>
            <Navbar className='navbar' bg="light" variant="light">
        <Container>
          <Navbar.Brand className='nav-title' href="/#/"> <h3>e-commerce</h3> </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className='icon' href="/#/login"> <i class="fa-regular fa-user"></i> </Nav.Link>
              <Nav.Link className='icon' href="/#/purchases"><i class="fa-solid fa-bag-shopping"></i> </Nav.Link>
              <Nav.Link className='icon' role="button"  onClick={handleShow}><i class="fa-solid fa-cart-shopping"></i> </Nav.Link>
              <Nav.Link role="button" onClick={logout}>
                Log out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    <Cart show={show} handleClose={handleClose}/>
        </div>
    );
};

export default NavBar;