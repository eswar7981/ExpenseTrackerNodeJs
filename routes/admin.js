const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET


// /admin/products => GET


// /admin/add-product => POST
router.get('/add-product', adminController.postAddProduct);


router.get('/getProducts',adminController.getProducts)


router.get('/products', adminController.getProducts);

/*

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);


*/
router.post('/delete-product/:productId', adminController.postDeleteProduct);



module.exports = router;
