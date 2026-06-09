import { useState } from "react";
import axios from "axios";
import "../styles/Buildurpizza.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useEffect } from "react";
import { useLogin } from "../context/LoginContext";


function Buildurpizza() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedingredients,setSelectedingredients]=useState([]);


  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const {user}=useLogin();

  const selectedPizza = location.state;

  const totalprice1=ingredients.filter((ingredient)=>selectedingredients.includes(ingredient.id)).reduce((total,ingredient)=>total+ingredient.price,0);
  
  const totalprice = (selectedPizza?.price || 0) + totalprice1;

  const handleBuildPizza = async () => {
  if (!selectedPizza) {
    alert("Select a pizza first 🍕");
    navigate("/order");
    return;
  }
  if(!user){
    alert("Login to Buildurpizza!!");
    navigate("/login");
  }
  else{

  const selectedExtras = ingredients.filter((i) =>
    selectedingredients.includes(i.id)
  );

  const cartItem = {
    userid:user._id,
    id: selectedPizza.id,
    name: selectedPizza.name,
    image: selectedPizza.image,
    basePrice: selectedPizza.price,
    ingredients: selectedPizza.ingredients,
    extraIngredients: selectedExtras,
    totalPrice: totalprice,
    quantity: 1,
  };

  addToCart(cartItem);
  try{
      const response =await axios.post("http://localhost:3000/api/Postcart",cartItem);
      console.log(response.data)
  }
  catch(error){
    console.log("Error storing cart data in database",error);
  }
  navigate("/cart");
 }
};

  const handleadd=(id)=>{
    if(!selectedingredients.includes(id)){
        setSelectedingredients([...selectedingredients, id]);
    }
    else{
        setSelectedingredients(
            selectedingredients.filter((item) => item !== id)
        );
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/Getingredients/all")
      .then((response) => {
        setIngredients(response.data);
      })
      .catch((error) => {
        console.log("Error Fetching Ingredients Data ", error);
      });
  }, []);
  return (
    <div className="buildurpizzacontainer container-fluid">
      <div className="row">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <p className="fs-5">
          Pizzeria now gives you options to build your own pizza. Customize your
          pizza by choosing ingredients from the list given below
        </p>
        <div className="tablecontainer">
          <table className="table table-striped table-bordered">
            <tbody>
                {ingredients.map((ingredient)=>(
              <tr key={ingredient.id}>
                <td>
                  <div className="ingredientimage">
                  <img
                    src={ingredient.image}
                    width={"100px"}
                    height={"100px"}
                  />
                  </div>
                </td>
                <td className="ingredientcolumn2"><div className="ingredientpricedata"><span className="fw-bold p-4">{ingredient.tname}</span><span className="fw-bold p-4">₹{ingredient.price.toFixed(2)}</span></div></td>
                <td ><div className="ingredientcolumn3"><input type="checkbox" checked={selectedingredients.includes(ingredient.id)} readOnly className="customcheckbox"/><span onClick={()=>handleadd(ingredient.id)} style={{paddingLeft:"10px",color:"#ffc107",cursor:"pointer"}}>Add</span></div></td>
              </tr>
              ))}
            </tbody>
          </table>
          <div className="totalprice">
            <h3>Total Cost :{totalprice1}</h3>
          </div>
          <div>
            <button className="buildyourpizzabutton" onClick={()=>handleBuildPizza()}>Build Ur Pizza</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Buildurpizza;
