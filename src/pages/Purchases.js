import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import { getPurchase } from "../store/slices/purchase.slice";

const Purchases = () => {
 
  const dispatch = useDispatch();

  const purchases =useSelector((state) => state.purchase);

  const navigate = useNavigate();


   /* const getDate = purchaseDate => {
      const event = new Date(purchaseDate);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = event.toLocaleDateString('en-us', options);
      return date;  
  }*/

   
  

  useEffect(() => {
    dispatch(getPurchase());
  }, [dispatch]);

  console.log(purchases)
  return (
    <div>

      <div className="title-detail">
        <h1>Home-Purchase </h1>
        <h3>My Purchases</h3>
       </div>
      
     <ul className="purchase">
      {purchases.map((purchase)=>(
        <li className="ctn-purchase">
          {purchase.cart.products.map((product)=>(
            <div onClick={()=>navigate(`/product/${product.id}`)}>
              <h1 className="border-purchase">Date</h1>
             <div className="text-purchase">

             <p>{product.title}</p>
              <div className="quantity-purchase-2">
              <p>{product.productsInCart.quantity}</p> 
              </div>
             <p className="bold">US${product.price}</p>   
             </div>
            </div>
          ))}
        </li>
      ))}
     </ul>
     
      
    </div>
  );
};

export default Purchases;