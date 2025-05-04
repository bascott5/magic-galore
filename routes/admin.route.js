"use strict";
const express = require("express");
const adminController = require("../controllers/admin.controller");
const router = express.Router();

router.get("/list-products", adminController.adminProducts);

// insert a product
router.post("/insert-product", adminController.insertProduct);

router.get("/edit-product/:id", adminController.adminEdit);

// edit a product
router.post("/edit-product/:id", adminController.editProduct);

router.get("/delete-product/:id", adminController.deleteProduct);

router.get("/upload-products", adminController.adminUpload);

// bulk upload products from JSON
router.post("/upload-products", adminController.bulkUploadProduct);

module.exports = router;