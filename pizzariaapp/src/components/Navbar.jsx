import pizzeriaimage from "../assets/pizzeria.png";
import { Link,useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import{useLogin} from "../context/LoginContext";


function Navbar() {

  const navigate=useNavigate();
  const {user,logout}=useLogin();


  const gotologin=()=>{
    navigate('/login')
  }

  const Gotocart=()=>{
    if(!user){
      navigate('/login');
    }
    else{
      navigate('/cart');
    }
  }
  return (
    <div className="container-fluid">
      <div className="row">
      <nav className="nav">
        <div className="div1">
          <h1 className="heading1">Pizzeria</h1>
          <Link to="/home">
            <img src={pizzeriaimage} height="100px" width="110px" />
          </Link>
          <Link to="/order" className="link">
            Order Pizza
          </Link>
          <Link to="/build" className="link">
            Build Ur Pizza
          </Link>
            {user?
                <div className="userdivlogout">
                  <div>
                      <button className="cart btn btn-warning" onClick={()=>Gotocart()}>
                          <i className="fa-sharp fa-solid fa-cart-shopping"></i>Shopping Cart
                      </button>
                      <button className="logoutbutton btn btn-warning" onClick={logout}>Logout</button>
                  </div>
                  <div className="logindiv">
                      <i className="fa-sharp fa-solid fa-circle-user usericon"></i>
                      <span className="login">{user.username}</span>
                  </div>  
                </div>
            :
                <div className="userdiv">
                  <div>
                      <button className="cart btn btn-warning" onClick={()=>Gotocart()}>
                          <i className="fa-sharp fa-solid fa-cart-shopping"></i>Shopping Cart
                      </button>
                  </div>

                  <div className="logindiv">
                      <i className="fa-sharp fa-solid fa-circle-user usericon" onClick={gotologin} style={{cursor:"pointer"}}></i>
                      <span className="login" style={{cursor:"pointer"}}  onClick={gotologin}>Login/Signup</span>
                  </div>
                </div>
            }
        </div>
      </nav>
      </div>
    </div>
  );
}

export default Navbar;
