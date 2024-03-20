import logo from "./logo.svg";
import "./App.css";
import { Route,Routes } from "react-router-dom";
import NavigationBar from "./Components/Navigation/NavigationBar";
import Login from "./Components/Autentication/Login";
import SignUp from "./Components/Autentication/SignUp";

import Logout from "./Components/Autentication/Logout";



import ForgotPassword from "./Components/Autentication/ForgotPassword";

import { useEffect, useState } from "react";

import PasswordReset from "./Components/Autentication/PasswordReset";
import Products from "./Components/AllPages/Products";
import Orders from "./Components/AllPages/Orders";
import Cart from "./Components/AllPages/Cart";
import AddProduct from "./Components/adminPages/AddProduct";
import AdminProduct from "./Components/AllPages/AdminProduct";
import AdminProducts from "./Components/adminPages/AdminProducts";
import EditProduct from "./Components/adminPages/EditProduct";

function App() {
  const [openingPage,setOpeningPage]=useState(true)
 
  useEffect(()=>{
setTimeout(()=>{
setOpeningPage(false)
},3000)
  },[])
 
  
  return (
   

<>
<header>
        <NavigationBar></NavigationBar>
      </header>
      <main>
        <Routes>
         <Route path="/products" element={<Products></Products>}></Route>
         <Route path="/orders" element={<Orders></Orders>}></Route>
         <Route path="/cart" element={<Cart></Cart>}></Route>
         <Route path="admin/add-product" element={<AddProduct></AddProduct>}></Route>
         <Route path="/adminProduct" element={<AdminProduct></AdminProduct>}></Route>
         <Route path="/admin/products" element={<AdminProducts></AdminProducts>}></Route>
       <Route path="/admin/editProduct/:id" element={<EditProduct></EditProduct>}></Route>
         </Routes>
      </main>
 
</>
  )
}

export default App;
