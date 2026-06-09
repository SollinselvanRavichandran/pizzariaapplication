import './App.css'
import Home from './pages/Home';
import Buildurpizza from './pages/Buildurpizza'
import Orderpizza from './pages/Orderpizza';
import Cart  from './pages/Cart';
import withlayout from './hoc/withlayout';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
// import Loginpage from './pages/Loginpage';
// import Registerpage from './pages/Registerpage';

  const LayoutedHome = withlayout(Home);
  const LayoutedOrder=withlayout(Orderpizza);
  const LayoutedBuildurpizza=withlayout(Buildurpizza);
  const LayoutedCart=withlayout(Cart);
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LayoutedHome/>}/>
          <Route path='/login' element={<Loginpage/>}/>
          <Route path='/register' element={<Registerpage/>}/>
          <Route path='/cart' element={<LayoutedCart/>}/>
          <Route path="/home" element={<LayoutedHome/>}/>
          <Route path="/build" element={<LayoutedBuildurpizza/>}/>
          <Route path="/order" element={<LayoutedOrder/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
