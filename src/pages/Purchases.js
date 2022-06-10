import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchase } from "../store/slices/purchase.slice";

const Purchases = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const purchases =useSelector(state => state.purchases);


  useEffect(() => {
    dispatch(getPurchase());
  }, [dispatch]);

  return (
    <div>
      <ul>
       { 
       
       purchases.map((purchase)=>(
       <li>
         {purchase.cart.products.map((product)=>(
           
           <div onClick={()=> navigate(`/product/${product.id}`) }>
             {product.title}
           </div>
         ))}
       </li>
       ))
       }

      </ul>
    </div>
  );
};

export default Purchases;