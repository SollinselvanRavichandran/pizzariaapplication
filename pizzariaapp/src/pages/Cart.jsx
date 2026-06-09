// import { useCart } from "../context/useCart";
import "../styles/cart.css";
import { useState,useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLogin } from "../context/LoginContext";

function Cart() {
  // const { cartItems, removeFromCart, updateQuantity, getTotal } = useCart();
  const[cartitem,setCartitem]=useState([]);
  const{user}=useLogin();

  const fetchcartitems = async () => {
   try {

      const response = await axios.get(
        `https://pizzariaapplication.onrender.com/api/Getcartitems/all/${user._id}`
      );

      await setCartitem(response.data);

   }
   catch(error){

      console.log(error);

   }

}
  useEffect(()=>{
    if(user){
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchcartitems();
    }
    else{

        setCartitem([]);

    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])

  const totalquantity=cartitem.reduce((sum,item)=>sum+item.quantity,0);
  const totalamount =cartitem.reduce((total,item)=>total+item.totalPrice,0);

  const updateQuantity= async (item,type)=>{

    let newQuantity = type ==="inc"?item.quantity+1:Math.max(item.quantity-1,1);

    const singleprice=item.totalPrice/item.quantity;

    const totalprice=singleprice*newQuantity;

    try{
       await axios.put(`https://pizzariaapplication.onrender.com/api/cartitem/update/${item._id}`,{
        quantity:newQuantity,
        totalPrice:totalprice
       });

       await fetchcartitems();
    }
    catch(error){
      console.log("Error updating cart item ",error);
    }
  }

  const deleteitem=async (item)=>{
    try{
        await axios.delete(`https://pizzariaapplication.onrender.com/api/cartitem/delete/${item._id}`);
        await fetchcartitems();
    }
    catch(error){
      console.log("Error deleting the data ",error);
    }
  }
  
  return (
    <div className="cartcontainer container-fluid">
      <h2 className="cartheading">Shopping Cart</h2>
      <div className="foralign">
      <div className="cartinnercontainer">
        {cartitem.map((items)=>(
            <div key={items.id} className="itemscontainer">
                <div className="itemsinsidecontainer1"> 
                  <img src={items.image} width={"100px"} height={"100px"}/>
                </div>
                <div className="itemsinsidecontainer2">
                   <p style={{textAlign:"start"}}><span className="fs-6 fw-bold">Name:</span>{items.name}</p>
                   <p style={{textAlign:"start"}}><span className="fs-6 fw-bold">Ingredients:</span>{items.ingredients.join(",")}</p>
                   <p style={{textAlign:"start"}}><span className="fs-6 fw-bold">Add-ons:</span>{items.extraIngredients.map((extra)=>extra.tname).join(",")}</p>
                   <div className="quantityoutercontainer">
                      <div className="quantitycontainer">
                          <span className="fs-4 fw-bold" style={{cursor:"pointer"}} onClick={()=>updateQuantity(items,"dec")}>-</span><span className="fs-4 fw-bold">{items.quantity}</span><span className="fs-4 fw-bold" style={{cursor:"pointer"}} onClick={()=>updateQuantity(items,"inc")}>+</span>
                      </div>
                      <div className="deleteitem">
                          <span className="deleteitemspan" style={{cursor:"pointer"}} onClick={()=>deleteitem(items)}>Delete Item</span>
                      </div>
                   </div> 
                </div>
                <div className="itemsinsidecontainer3">
                  <p className="pricepara"><span className="fs-4 fw-bold">Price:</span>₹{items.totalPrice.toFixed(2)}</p>
                </div>
            </div>
        ))}
        {
          totalquantity==0?(
            <div className="emptycartcontainer">
                <h2>OOPS!!!Your cart is empty,select your pizza to checkout.</h2>
            </div>
          ):
          (
            <div className="bottomsubtotalcontainer">
                <p className="bottomsubtotalpara"><span>Sub Total({totalquantity<=1?`${totalquantity}item`:`${totalquantity}items`}):</span>₹{totalamount.toFixed(2)}</p>
            </div>
          )
        }
        
      </div>
      <div className="subtotalcontainer">
          <p className="subtotalpara">Sub Total({totalquantity<=1?`${totalquantity}item`:`${totalquantity}items`})</p>
          <p className="totalamount">Total Amount:₹{totalamount.toFixed(2)}</p> 
          <button className="btn btn-warning subtotalbutton">Proceed to Buy</button>
      </div>
      </div>
    </div>
  );
}

export default Cart;
