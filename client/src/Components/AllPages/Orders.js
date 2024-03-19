import React from "react";
import "../css/orders.css";


const Orders = () => {
  let orders = [
    {
      id: 1,
      products: [
        { title: "a book", quantity: 2 },
        { title: "a book", quantity: 2 },
        { title: "a book", quantity: 2 },
      ],
    },
  ];

  return (
    <div>
         
      <ul className="orders">
        {orders &&
          orders.map((order) => (
            <li className="orders_item" >
              <h3>{order.id}</h3>
              <ul className="orders_products">
                {order.products.map((prod)=>(
                    <li class="orders__products-item">{prod.title}</li>
                ))
                }
               </ul>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Orders;
