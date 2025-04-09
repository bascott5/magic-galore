"use strict";
const model = require("../models/admin.model");

function insertProduct(req, res, next) {
    const categoryId = req.body.categoryId;
    const name = req.body.name;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const params = [
        categoryId,
        name,
        description,
        imageUrl,
        price
    ];

    if (name && description && imageUrl && price) {
        try {
            res.json(model.insertProduct(params));
        } catch (err) {
            console.error(err.message);
            next(err);
        }
    } else {
        res.status(400).send("invalid Request");
    }
}

function editProduct(req, res, next) {
    const name = req.body.name;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;

    const id = req.params.id;
    const params = [
        name,
        description,
        imageUrl,
        price,
        id
    ];

    if (name && description && imageUrl && price && id) {
        try {
            res.json(model.editProduct(params));
        } catch (err) {
            console.error(err.message);
            next(err);
        }
    } else {
        res.status(400).send("invalid Request");
    }
}

function bulkUploadProduct(req, res, next) {
    const uploads = req.body.uploads;
    let params = [];
    for (let i = 0; i < uploads.length; i++) {
        params.push(uploads[i]);
    }

    if (uploads) {
        try {
            res.json(model.bulkUploadProduct(params));
        } catch (err) {
            console.error(err.message);
            next(err);
        }
    } else {
        res.status(400).send("invalid Request");
    }
}

module.exports = {
    insertProduct,
    editProduct,
    bulkUploadProduct
}