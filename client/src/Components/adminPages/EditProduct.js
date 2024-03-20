import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const EditProduct = () => {
  const [orderStatus, setOrderStatus] = useState(false);
  const [productDetails,setProductDetails]=useState({
    title: "",
    imageUrl: "",
    price: "",
    description: "",
  })

  let id = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/admin/products/editProduct/${id.id}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log(resp)
        setProductDetails(resp.product)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



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
    setProductDetails({ ...productDetails, ["imageUrl"]: e.target.value });
  };

 

  const editHanler=(e)=>{
    e.preventDefault()
    fetch(`http://localhost:5000/admin/products/editProduct/${id.id}`, {
      method: "POST",
      body: JSON.stringify(productDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        if (resp.status == "success") {
          setOrderStatus(true);
          setTimeout(() => {
            setOrderStatus(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }

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
               {productDetails.title} product details are updated
            </p>
          </div>
        )}
        <form className="product-form" >
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
              value={productDetails.imageUrl}
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

            onClick={editHanler}
          >
            Edit
          </button>
        </form>
      </main>
    </>
  );
};

export default EditProduct;
