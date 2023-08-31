
import { Routes,BrowserRouter as Router,Route } from "react-router-dom";


import AdminLoginInterface from "./administrator/adminlogin/AdminLoginInteface";
import Dashboard from "./administrator/adminlogin/Dashboard";
import Home from "./userinterface/screens/Home/Home";
import Cart from "./userinterface/screens/Cart/Cart";
import ProductViewWithCategory from "./userinterface/screens/Home/ProductViewWithCategory";
import SelectProduct from "./userinterface/screens/Home/SelectProduct";
import Cart2 from "./userinterface/screens/Cart2/Cart2";
import MakePayment from "./userinterface/screens/MakePayment/MakePayment";
function App() {
  return (
    <div>
     
   <Router>
      <Routes>
      <Route element={<AdminLoginInterface/>} path="/adminlogin"/>
      <Route element={<Dashboard/>} path="/dashboard/*"/>
      <Route element={<Home/>} path="/home"/>
      <Route element={<ProductViewWithCategory />} path="/productviewwithcategory"/>  
      <Route element={<Cart2/>} path="/mycart"/>
      <Route element={<SelectProduct/>} path="/selectproduct"/>
      <Route element={<Cart2/>} path="/mycart"/>
      <Route element={<MakePayment/>} path="/payment"/>



 
        
        


      </Routes>
    </Router>
      
    
    
    </div>
  );
}


export default App;
