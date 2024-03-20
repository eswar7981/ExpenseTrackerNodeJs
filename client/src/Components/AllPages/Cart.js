import React, { useEffect, useState } from "react";
import "../css/cart.css";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        if (resp.status == "success") {
          setProducts(resp.cartItems);
        }
      });
  }, []);

  const [orderStatus, setOrderStatus] = useState(false);

  const orderHandler = (e) => {
    e.preventDefault();
    setOrderStatus(true);
    setTimeout(() => {
      setOrderStatus(false);
    }, 2000);
  };

  const deleteItemFromCartHandler=(e,product)=>{
    e.preventDefault()
   
      fetch(`http://localhost:5000/deleteItemFromCart/${product._id}`)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp)
        })
        .catch((err) => {
          console.log(err);
        });
     



      fetch("http://localhost:5000/cart")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        if (resp.status == "success") {
          setProducts(resp.cartItems);
        }
      });
  }

  return (
    <>
      {orderStatus && (
        <div
          style={{
            display: "flex",
            position: "absolute",
            justifyContent: "center",
            marginLeft: "500px",
            marginTop: "-50px",
          }}
        >
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

      {products &&
        products.map((prod) => (
          <ul className="cart__item-list">
            <li className="cart__item">
              <h1>{prod.title}</h1>
              <h2>Quantity: {prod.quantity} </h2>
              <form >
                <input type="hidden" value="" name="productId" />
                <button className="btn danger" type="submit" onClick={(e)=>deleteItemFromCartHandler(e,prod)}>
                  Delete
                </button>
              </form>
            </li>
          </ul>
        ))}

      {products && (
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
