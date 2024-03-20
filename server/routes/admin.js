const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET


// /admin/products => GET


// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);





router.get('/products', adminController.getProducts);



router.get('/products/editProduct/:productId', adminController.getEditProduct);

router.post('/products/editProduct/:productId', adminController.postEditProduct);
/*
router.post('/edit-product', adminController.postEditProduct);


*/
router.get('/deleteProduct/:productId', adminController.DeleteProduct);





module.exports = router;
