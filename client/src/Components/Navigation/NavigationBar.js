import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/AuthStore";
import useRazorpay from "react-razorpay";

const NavigationBar = () => {
  const login = useSelector((state) => state.auth.login);

  const dispatch = useDispatch();

  return (
    <>
      {login &&
        (login == "customer" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(authActions.setLogin());
            }}
            style={{
              display: "flex",
              position: "absolute",
              marginLeft: "20px",
              marginTop: "-25px",
              backgroundColor: "skyblue",
              borderRadius: "10px",
              border: "solid",
            }}
          >
            Admin
          </button >
        ) : (
          <button
          
          style={{
            display: "flex",
            position: "absolute",
            marginLeft: "20px",
            marginTop: "-25px",
            backgroundColor: "skyblue",
            borderRadius: "10px",
            border: "solid",
          }}

          
          onClick={(e) => {
            e.preventDefault();
            dispatch(authActions.setLogin());
          }}>Buyer</button>
        ))}
      <nav>
        {login && (
          <div className="navi" style={{ marginTop: "40px" }}>
            <ul style={{ listStyleType: "None" }}>
              <div className="dropdown">
                <button className="dropbtn">
                  <div className="menu"></div>
                  <div className="menu"></div>
                  <div className="menu"></div>
                </button>
                <div className="dropdown-content">
                  {login == "admin" && (
                    <>
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
                        <NavLink style={{ textDecoration: "None" }} to="/cart">
                          <div className="btn">Cart</div>
                        </NavLink>
                      </li>
                      
                     
                    </>
                  )}
                  {login == "customer" && (
                    <>
                      <li>
                        <NavLink
                          style={{ textDecoration: "None" }}
                          to="/admin/products"
                        >
                          <div className="btn">Products</div>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          style={{ textDecoration: "None" }}
                          to="admin/add-product"
                        >
                          <div className="btn">Add Product</div>
                        </NavLink>
                      </li>

                    </>
                  )}
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
