
import { createRoot } from 'react-dom/client'
import { CartProvider } from "./context/CartContext";
import { LoginProvider } from './context/LoginContext.jsx';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <LoginProvider>
      <App />
    </LoginProvider>
  </CartProvider>
)
