import React, { useState } from "react";

import "../css/forms.css";
import "../css/product.css";
import { json } from "react-router-dom";

const AddProduct = () => {
  const [orderStatus, setOrderStatus] = useState(false);

  const [productDetails, setProductDetails] = useState({
    title: "",
    imageURL: "",
    price: "",
    description: "",
  });

  const titleHandler = (e) => {
    setProductDetails({ ...productDetails, ["title"]: e.target.value });
  };

  const priceHandler = (e) => {
    setProductDetails({ ...productDetails, ["price"]: e.target.value });
  };

  const descriptionHandler = (e) => {
    setProductDetails({ ...productDetails, ["description"]: e.target.value });
  };

  const ImageURLHandler = (e) => {
    setProductDetails({ ...productDetails, ["imageURL"]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/add-product", {
      method: "POST",
      body: JSON.stringify(productDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        if(resp.status=='success'){
        setOrderStatus(true);
        setTimeout(() => {
          setOrderStatus(false);
        }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setProductDetails({ title: "", imageURL: "", price: "", description: "" });
  };

  return (
    <>
      <main>
        {orderStatus && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "20px 20px",
              }}
            >
              A new book {productDetails.title} is added for sale
            </p>
          </div>
        )}
        <form className="product-form" onSubmit={submitHandler}>
          <div className="form-control">
            <label for="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={productDetails.title}
              onChange={titleHandler}
            />
          </div>
          <div class="form-control">
            <label for="imageUrl">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              value={productDetails.imageURL}
              onChange={ImageURLHandler}
            />
          </div>
          <div className="form-control">
            <label for="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={productDetails.price}
              onChange={priceHandler}
            />
          </div>
          <div className="form-control">
            <label for="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows="5"
              value={productDetails.description}
              onChange={descriptionHandler}
            ></textarea>
          </div>

          <button
            className="btn"
            type="submit"
            style={{ backgroundColor: "black", color: "white" }}
          >
            Add
          </button>
        </form>
      </main>
    </>
  );
};

export default AddProduct;
