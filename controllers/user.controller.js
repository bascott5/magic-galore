"use strict";
const model = require("../models/user.model");

function allProducts(req, res, next) {
    try {
        res.json(model.allProducts());
    } catch (err) {
        console.error(err.message);
        next(err);
    }
}

function productsBySearch(req, res, next) {
    const category = req.params.category;
    const search = req.query.search + "%";
    let params = [
        category, 
        search
    ];

    if (category && search) {
        try {
            res.json(model.productsBySearch(params));
        } catch (err) {
            console.error(err.message);
            next(err);
        }
    } else {
        res.status(400).send("invalid Request");
    }
}

function productById(req, res, next) {
    try {
        res.json(model.productById(req.params.id));
    } catch (err) {
        console.error(err.message);
        next(err);
    }
}

function addProductToCart(req, res, next) {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const qty = req.query.qty;
    let params = [
        cartId,
        productId,
        qty
    ];

    if (cartId && productId && qty) {
        try {
            res.json(model.addProductToCart(params));
        } catch (err) {
            console.error(err.message);
            next(err);
        }
    } else {
        res.status(400).send("invalid Request");
    }
}

function removeProductFromCart(req, res, next) {
    try {
        res.json(model.removeProductFromCart(req.params.id));
    } catch (err) {
        console.error(err.message);
        next(err);
    }
}

function checkout(req, res, next) {
    try {
        res.json(model.checkout(req.params.id));
    } catch (err) {
        console.error(err.message);
        next(err);
    }
}

module.exports = {
    allProducts,
    productsBySearch,
    productById,
    addProductToCart,
    removeProductFromCart,
    checkout
}