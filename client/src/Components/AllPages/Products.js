import React, { useEffect, useState } from "react";

import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setProducts(resp.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addToCartHandler = (e, id) => {
    
    e.preventDefault();
    fetch("http://localhost:5000/addToCart", {
      method: "POST",
      body: JSON.stringify({ productId: id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {!products.length == 0 &&
        products.map((product) => (
          <>
            <div className="grid">
              <article className="product-item">
                <header className="card__header">
                  <h1 className="product__title">{product.title}</h1>
                </header>
                <div className="card__image">
                  <img src="https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg?w=900&t=st=1710830475~exp=1710831075~hmac=5f9d9aaca5d55572359a98d5bfcb17b4a2e6e954bad235f68617c5b910dc8861" />
                </div>
                <div className="card__content">
                  <h2 className="product__price">{product.price}</h2>
                  <p className="product__description">{product.description}</p>
                </div>
                <div className="card__actions">
                  <button
                    style={{ backgroundColor: "skyblue", color: "black" }}
                    className="btn"
                    onClick={(e) => addToCartHandler(e, product._id)}
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            </div>
          </>
        ))}
    </div>
  );
};

export default Products;
