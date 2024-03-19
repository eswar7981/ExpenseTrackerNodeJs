import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/AuthStore";
import useRazorpay from "react-razorpay";

const NavigationBar = () => {
  const premium = useSelector((state) => state.auth.premium);
  const [Razorpay] = useRazorpay();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const login = useSelector((state) => state.auth.login);

  const paymentHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/expenses/addExpense/payment", {
      method: "GET",
      headers: {
        token: token,
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((response) => {
        console.log("hii");
        console.log(response);
        var options = {
          key: response.key_id,
          order_id: response.order.id,
          handler: function (response) {
            fetch(
              "http://localhost:5000/expenses/addExpense/updatePaymentStatus",

              {
                headers: {
                  token: token,
                  order_id: options.order_id,
                  payment_id: response.razorpay_payment_id,
                },
              }
            )
              .then((respo) => {
                return respo.json();
              })
              .then((res) => {
                console.log(res);
                dispatch(authActions.setPremium());

                alert("You are a Premium User from Now");
              });
          },
        };

        const rzp = new Razorpay(options);
        rzp.open();
        e.preventDefault();
        rzp.on("payment.failed", function (response) {
          console.log(response);
          rzp.close();
          alert("something went wrong");
        });
      });
  };

  return (
    <>
      <nav>
      

        {!login && (
         <div className="navi" style={{marginTop:'40px'}}>
         <ul style={{ listStyleType: "None" }}>
           <div className="dropdown">
             <button className="dropbtn">
               <div className="menu"></div>
               <div className="menu"></div>
               <div className="menu"></div>
             </button>
             <div className="dropdown-content">
            
               <li>
                 <NavLink
                   style={{ textDecoration: "None" }}
                   to="/products"
                 >
                   <div className="btn">Products</div>
                 </NavLink>
               </li>

               <li>
                 <NavLink
                   style={{ textDecoration: "None" }}
                   to="/orders"
                 >
                   <div className="btn">Orders</div>
                 </NavLink>
               </li>

               <li>
                 <NavLink
                   style={{ textDecoration: "None" }}
                   to="/cart"
                 >
                   <div className="btn">Cart</div>
                 </NavLink>
               </li>
               <li>
                 <NavLink
                   style={{ textDecoration: "None" }}
                   to="/add-product"
                 >
                   <div className="btn">Add Product</div>
                 </NavLink>
               </li>
               <li>
                 <NavLink
                   style={{ textDecoration: "None" }}
                   to="/adminProducts"
                 >
                   <div className="btn">admin Products</div>
                 </NavLink>
               </li>
             </div>
           </div>
         </ul>
       </div>
        )}
      </nav>
    </>
  );
};

export default NavigationBar;
