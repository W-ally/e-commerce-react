import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { filterCategory } from "../store/slices/products.slice";
import { addToCart } from "../store/slices/cart.slice";

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
    <div>
      <Card>
        <h1>{products.title} </h1>

        <input
          type="number"
          placeholder="quantity"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
        />
        <Button onClick={addProduct}>Add to product</Button>
        <Card.Img
          variant="top"
          src={products.productImgs}
          className="fluid-img"
        />
        <Card.Body>
          <Card.Text>{products.description}</Card.Text>
          <p></p>
          <Card.Title>US${products.price}</Card.Title>
          <Card.Title>{products.status}</Card.Title>
        </Card.Body>
      </Card>

      {product.map((productItem) => (
        <li onClick={() => navigate(`/product/${productItem.id} `)}>
          {productItem.title}
        </li>
      ))}
      <div> <Button onClick={addProduct}>Add to product</Button></div>
    </div>
  );
};

export default ProductDetail;
