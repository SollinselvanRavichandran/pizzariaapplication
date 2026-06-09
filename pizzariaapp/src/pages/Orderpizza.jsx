import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Orderpizza.css";
import { useNavigate } from "react-router-dom";
import {useLogin} from "../context/LoginContext";
import "bootstrap/dist/css/bootstrap.min.css";

function Orderpizza() {
  const [pizza, setPizza] = useState([]);
  const navigate = useNavigate();
  const {user}=useLogin();

  const handleCustomize = (pizza) => {
      if(!user){
        alert("Login to OrderPizza!!");
        navigate("/login");
      }
      else{
          navigate("/build", { state: pizza });
      }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/Getpizzas/all")
      .then((response) => {
        setPizza(response.data);
      })
      .catch((error) => {
        console.log("Error fetching the data ", error);
      });
  }, []);

  return (
    <div className="orderpizzacontainer container-fluid">
      <div className="row" style={{padding:"40px"}}>
        {pizza.map((pizzas, index) => (
          <div key={index} className="pizzacontentcontainer col-md-6">

            <div className="insidepizzacontainer1">
              <h2>{pizzas.name}</h2>
              <div
                style={{
                  backgroundColor: pizzas.type === "veg" ? "green" : "red",
                  width: "30px",
                  height: "30px",marginLeft:"80px",marginBottom:"80px"
                }}
              ></div>
              <h3>₹{pizzas.price.toFixed(2)}</h3>
            </div>

            <div className="insidepizzacontainer2">
                {/* description ,ingredients,toppings */}
                <p className="fs-5 pt-3 description">{pizzas.description}</p>
                <p className="ingredients"><span className="fs-5 fw-bold">Ingredients:</span><span className="fs-5 ingredientsspan">{pizzas.ingredients.map((item)=>item.trim()).join(",")}</span></p>
                <p className="toppings"><span className="fs-5 fw-bold">Toppings:</span><span className="fs-5 toppingsspan">{pizzas.toppings.map((item)=>item.trim()).join(",")}</span>.</p>
            </div>

            <div className="insidepizzacontainer3">
              <img src={pizzas.image} width={"200px"} height={"200px"}/>
              <button className="btn btn-warning addtocartbutton" onClick={()=>handleCustomize(pizzas)}>Add to Cart</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Orderpizza;
