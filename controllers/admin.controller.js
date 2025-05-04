"use strict";
const model = require("../models/admin.model");

function adminProducts(req, res, next) {
    try {
        const data = model.allProducts();
        res.render("admin-products", { products: data });
    } catch (err) {
        console.error(err.message);
        next(err);
    }
}

function adminEdit(req, res, next) {
    const id = req.params.id;

    if (id) {
        try {
            const data = model.getProduct(id);
            res.render("admin-edit", { product: data });
        } catch (err) {
            console.error(err.message);
            next(err);
        }
    } else {
        res.status(400).send("invalid Request");
    }
}

function adminUpload(req, res, next) {
    try {
        res.render("admin-upload");
    } catch (err) {
        console.error(err.message);
        next(err);
    }
}

function insertProduct(req, res, next) {
    const categoryId = req.body.categoryId;
    const name = req.body.name;
    const description = req.body.description;
    const set = req.body.set;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const qty = req.body.qty;
    const params = [
        categoryId,
        name,
        description,
        set,
        imageUrl,
        price,
        qty
    ];

    if (categoryId && name && description && set && imageUrl && price && qty) {
        try {
            model.insertProduct(params);
            res.redirect("/admin/list-products");
        } catch (err) {
            console.error(err.message);
            next(err);
        }
    } else {
        res.status(400).send("invalid Request");
    }
}

function editProduct(req, res, next) {
    const categoryId = req.body.categoryId;
    const name = req.body.name;
    const description = req.body.description;
    const set = req.body.set;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const qty = req.body.qty;

    const id = req.params.id;
    const params = [
        categoryId,
        name,
        description,
        set,
        imageUrl,
        price,
        qty,
        id
    ];

    if (categoryId && name && description && set && imageUrl && price && qty && id) {
        try {
            model.editProduct(params);
            res.redirect("/admin/list-products");
        } catch (err) {
            console.error(err.message);
            next(err);
        }
    } else {
        res.status(400).send("invalid Request");
    }
}

function deleteProduct(req, res, next) {
    const id = req.params.id;

    if (id) {
        try {
            model.deleteProduct(id);
            res.redirect("/admin/list-products");
        } catch (err) {
            console.error(err.message);
            next(err);
        }
    } else {
        res.status(400).send("invalid Request");
    }
}

function bulkUploadProduct(req, res, next) {
    const uploads = req.body;

    if (uploads) {
        try {
            res.json(model.bulkUploadProduct(uploads));
        } catch (err) {
            console.error(err.message);
            next(err);
        }
    } else {
        res.status(400).send("invalid Request");
    }
}

module.exports = {
    adminProducts,
    adminEdit,
    adminUpload,
    insertProduct,
    editProduct,
    deleteProduct,
    bulkUploadProduct
}