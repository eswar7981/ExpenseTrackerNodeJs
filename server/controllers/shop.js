const Product = require("../models/product");
const { use } = require("../routes/admin");
const Order=require('../models/order')
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.send({ status: "success", products: products });
    })
    .catch((err) => {
      res.send({ status: "failed" });
      console.log(err);
    });
};

exports.getOrders=(req,res,next)=>{
  Order.fetchAllOrders(req.user._id).then((orders)=>{
    res.send({status:'success',orders:orders})
  })
}

exports.getProduct = (req, res, next) => {

  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  console.log("hii");
  req.user.populate('cart.items.productId').then((cart) => {
  
   
    res.send({ status: "success", cartItems: cart.cart.items });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((res) => {
      console.log(res);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  req.user
    .deleteCartItem(prodId)
    .then(() => {
      res.send({ status: "success" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postOrder = (req, res, next) => {
  
  const newOrder = new Order(req.body.products);
  newOrder.createOrder(req.user._id).then(()=>{
    req.user.removeAllItemsFromCart()
  });
  
  
};

