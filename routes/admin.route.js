"use strict";
const express = require("express");
const adminController = require("../controllers/admin.controller");
const router = express.Router();

// insert a product
router.post("/insert-product", adminController.insertProduct);

// edit a product
router.patch("/edit-product/:id", adminController.editProduct);

// bulk upload products from JSON
router.post("/upload-products", adminController.bulkUploadProduct);

module.exports = router;