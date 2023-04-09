import logo from './logo.svg';
import './App.css';
import Products from './components/Products';
import Cart from './components/Cart';
import { BrowserRouter, Routes, Route,useParams  } from "react-router-dom";
import AddProduct from './components/AddProduct';


function App() {
  return (
   <>
<BrowserRouter>

      <Routes>
        <Route path="/" element={<Products />}/>
        
          <Route path="card/:id" element={<Cart/>} />
          <Route path="AddProduct" element={<AddProduct/>} />
          
         
      </Routes>
    </BrowserRouter>
   
   
   </>
  );
}

export default App;
