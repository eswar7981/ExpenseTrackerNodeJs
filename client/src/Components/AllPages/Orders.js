import React, { useEffect, useState } from "react";
import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getAllOrders")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        if (resp.status === "success") {
          console.log(typeof resp.orders[0].products);
          setOrders(resp.orders);
        }
      });
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3>Orders</h3>
      </div>

      <ul className="orders">
        {orders &&
          orders.map((order,index) => (
            <li className="orders_item" style={{display:'flex',marginLeft:'200px',gap:'20px'}}>
              <h3>{index+1}</h3>
              <h3>{order._id}</h3>
              <ul className="orders_products">
                {order.products.map((prod) => (
                  <>
                    <p>{prod.title}</p>
                    <p>Quantity:{prod.quantity}</p>
                  </>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Orders;
