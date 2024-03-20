const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.post('/addToCart',shopController.postCart)

router.get('/cart', shopController.getCart);

router.get('/getAllOrders', shopController.getOrders);

router.get('/deleteItemFromCart/:productId', shopController.postCartDeleteProduct);

router.post('/createOrder', shopController.postOrder);

router.get('/orders', shopController.getOrders);

module.exports = router;
