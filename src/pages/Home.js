import React, { useEffect, useState } from "react";
import { getProduct,filterProduct, filterCategory } from "../store/slices/products.slice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, FormControl, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const products=useSelector(state=>state.products)
  const [ search, setSearch ] = useState("");
  const [ categories, setCategories ] = useState([]);

  const filterProducts =()=>{
   dispatch(filterProduct(search));
  };
  const filterCategories =(id)=>{
    dispatch(filterCategory(id));
  };

  useEffect(() => {
    dispatch(getProduct());
    axios
    .get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
    .then(res=> setCategories(res.data.data.categories))
  }, [dispatch]);

  return (
    <div className="container-home">
      

      <Row className="g-4">
      <Col lg={3} className="mb-4">
                    <h4>Categories</h4>
                    <ListGroup>
                        {
                            categories.map(category => (
                                <ListGroup.Item key={category.id} onClick={() => filterCategories(category.id)}>
                                    {category.name}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
      </Col>

      <Col>
      <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search product"
                            onChange={e => setSearch(e.target.value)}
                            value={search}
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={filterProducts}>
                        <i class="fa-solid fa-magnifying-glass"></i>
                        </Button>
       </InputGroup>

    <Row xs={1} md={2} lg={3} className="g-4">
   
      {
        products.map(productItem=>(
          
          <Col>
          <Card  style={{cursor:"pointer"}} onClick={()=>navigate(`/product/${productItem.id}`)}>
           <Card.Body>
            <Card.Title>
              {productItem.title}
            </Card.Title>
                    
          </Card.Body>
           <Card.Img variant="top"
            src={productItem.productImgs} alt="" srcset="" />
             <Card.Title>
              <br />
              <p className="price-1">Price</p>
              <h1 className="price-2">US${productItem.price}</h1>
            </Card.Title>
            <div className="btn__purchase">
              
               <button>
               <i class="fa-solid fa-cart-shopping"></i>
               </button>
            </div>
         </Card>
         
         
         </Col>
        
        ))
      }
    </Row>
  </Col>
      
  </Row>
    
    </div>
  );
};

export default Home;