"use strict";
const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

// view all products
router.get("/all-products", userController.allProducts);

// view products by search and category
router.get("/products/:category", userController.productsBySearch);

// view product with detail
router.get("/product/:id", userController.productById);

// add products to cart
router.post("/add-product/:cartId/:productId", userController.addProductToCart);

// remove products from cart
router.delete("/remove-product/:id", userController.removeProductFromCart);

// checkout items in cart
router.patch("/checkout/:id", userController.checkout);

module.exports = router;