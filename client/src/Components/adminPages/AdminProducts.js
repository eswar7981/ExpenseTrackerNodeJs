import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/admin/products")
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

  const deleteProductHandler = (e, product) => {
    e.preventDefault();
    fetch(`http://localhost:5000/admin/deleteProduct/${product._id}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp);
        if(resp.status=='success'){
            console.log('product is deleted')
        }
      })
      .catch((err) => {
        console.log(err);
      });

      fetch("http://localhost:5000/admin/products")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setProducts(resp.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editProductHandler = (e, product) => {
    e.preventDefault();
    navigate(`/admin/editProduct/${product._id}`);
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
                    className="btn"
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
                      editProductHandler(e, product);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    style={{
                      display: "flex",
                      position: "absolute",
                      marginLeft: "250px",
                      marginTop: "-25px",
                      backgroundColor: "skyblue",
                      borderRadius: "10px",
                      border: "solid",
                    }}
                    onClick={(e) => {
                      deleteProductHandler(e, product);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </article>
            </div>
          </>
        ))}
    </div>
  );
};

export default AdminProducts;
