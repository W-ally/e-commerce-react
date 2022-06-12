import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { filterCategory } from "../store/slices/products.slice";
import { addToCart } from "../store/slices/cart.slice";
import { Card, Col, Row } from "react-bootstrap";


const ProductDetail = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState();

  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products);
  const navigate = useNavigate();

  const addProduct = () => {
    const product = {
      id,
      quantity,
    };
    dispatch(addToCart(product));
  };

  useEffect(() => {
    axios
      .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/`)
      .then((res) => {
        const searchNew = res.data.data.products.find(
          (newItem) => newItem.id === Number(id)
        );
        setProducts(searchNew);
        dispatch(filterCategory(searchNew.category.id));
      });
  }, [dispatch, id]);

  console.log(products);

  return (
  <div >
      <div className="title-detail">
        
        <h1>home - {products.title} </h1>
       </div>
     
      <div className="ctn-detail">
         <div className="ctn-img"><img src={products.productImgs} alt="" srcset="" /></div>
        
        <div className="ctn-text"> 
        
           <h1>{products.title} </h1>
           <p> {products.description}</p>

         <div className="ctn-text-1">
        <h2>Price</h2>
        <h2>Quantity</h2>
       
      </div>

       <div className="ctn-text-2">
      
       <h3>US${products.price}</h3>
       
       <input
           type="number"
           placeholder="quantity"
           onChange={(e) => setQuantity(e.target.value)}
           value={quantity}
         />
     
        </div>    
              
       
       <div className="ctn-btn"> 
       <button onClick={addProduct} type="submit">Add to Cart</button>
       </div>
         
        </div>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
   
   {
     product.map(productItem=>(
       
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
           <p>Price</p>
           {productItem.price}
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
       

      

      


      
  </div>
         
          
   
  );
};

export default ProductDetail;
