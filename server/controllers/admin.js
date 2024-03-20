const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageURL;
  const price = parseInt(req.body.price);
  const description = req.body.description;

  const product = new Product(title, price, description, imageUrl,req.user._id);

  product
    .save()
    .then((result) => {
      console.log(product);
      console.log("Created Product");
      res.send({ status: "success" });
    })
    .catch((err) => {
      res.send({ status: "failure" });
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.fetchById(id).then((resp) => {
    res.send({ status: "success", product: resp });
  });
};

exports.postEditProduct = (req, res, next) => {

  const id = req.params.productId;

  Product.updateById(
    id,
    req.body.title,
    req.body.price,
    req.body.description,
    req.body.imageUrl
  )
    .then((resp) => {
      res.send({ status: "success" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  
  Product.fetchAll()
    .then((products) => {
      res.send({ status: "success", products: products });
    })
    .catch((err) => {
      res.send({ status: "failed" });
      console.log(err);
    });
  /*req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));

    */
};

exports.DeleteProduct = (req, res, next) => {
  const id=req.params.productId
  Product.deleteById(id).then(()=>{
    res.send({status:'success'})
  }).catch((err)=>{
    console.log(err)
  })
};

exports.postDeleteProduct = (req, res, next) => {
  console.log("delete ee");
};
