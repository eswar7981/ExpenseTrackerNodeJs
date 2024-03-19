import React, { useState } from "react";
import "../css/cart.css";

const Cart = () => {
  const products = [];
  const [orderStatus, setOrderStatus] = useState(false);

  const orderHandler = (e) => {
    e.preventDefault();
    setOrderStatus(true);
    setTimeout(() => {
      setOrderStatus(false);
    }, 2000);
  };

  return (
    <>
      {orderStatus && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "20px 20px",
            }}
          >
            Order Placed
          </p>
        </div>
      )}

      {products.length != 0 &&
        products.map((prod) => (
          <ul className="cart__item-list">
            <li className="cart__item">
              <h1>p.productId.title</h1>
              <h2>Quantity: p.quantity </h2>
              <form action="/cart-delete-item" method="POST">
                <input type="hidden" value="" name="productId" />
                <button className="btn danger" type="submit">
                  Delete
                </button>
              </form>
            </li>
          </ul>
        ))}

      {products.length == 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <button
            className="btn"
            onClick={orderHandler}
            style={{ backgroundColor: "black" }}
          >
            Order
          </button>
        </div>
      )}

      {products.length == 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>No Orders</h1>
        </div>
      )}
    </>
  );
};

export default Cart;
