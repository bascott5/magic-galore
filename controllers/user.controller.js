"use strict";
const model = require("../models/user.model");

function allProducts(req, res, next) {
    try {
        const data = model.allProducts()
        res.render("product-list", { cards: data });
    } catch (err) {
        console.error(err.message);
        next(err);
    }
}

function productsBySearch(req, res, next) {
    const category = req.params.category;
    const search = req.query.search ? req.query.search + "%" : "%";
    const set = req.query.set ? req.query.set : "";
    const params = [
        category, 
        search,
        set
    ];

    if (category && search) {
        try {
            const data = model.productsBySearch(params);
            res.render("product-list", { cards: data });
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
        let product = model.productById(req.params.id);
        res.render("product-details", { product: product });
    } catch (err) {
        console.error(err.message);
        next(err);
    }
}

function viewCart(req, res, next) {
    try {
        const cart = model.viewCart(req.params.cartId);
        res.render("cart", { cartList: cart });
    } catch (err) {
        console.error(err.message);
        next(err);
    }
}

function getLogin(req, res, next) {
    try {
        res.render("login");
    } catch (err) {
        console.error(err.message);
        next(err);
    }
}

function getRegister(req, res, next) {
    try {
        res.render("register");
    } catch (err) {
        console.error(err.message);
        next(err);
    }
}

function postLogin(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const params = [
        username,
        password
    ];

    if (username && password) {
        try {
            const isAuthenticated = model.login(params);
            if (isAuthenticated) {
                res.redirect("/admin/list-products");
            } else {
                res.redirect("/user/login");
            }
        } catch (err) {
            console.error(err.message);
            next(err);
        }
    } else {
        res.status(400).send("invalid Request");
    }
}

function postRegister(req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const params = [
        username,
        email,
        password
    ];

    if (username && email && password) {
        try {
            const info = model.register(params);
            res.redirect("login");
        } catch (err) {
            console.error(err.message);
            next(err);
        }
    } else {
        res.status(400).send("invalid Request");
    }
}

function addProductToCart(req, res, next) {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const qty = req.body.qty;
    let params = [
        cartId,
        productId,
        qty
    ];

    if (cartId && productId && qty) {
        try {
            const inCart = model.checkProductInCart(params);
            if (inCart) {
                params.pop();
                model.increaseProductQty(params);
            } else {
                model.addProductToCart(params);
            }
            model.decreaseQty(productId);
            res.redirect("/user/all-products");
        } catch (err) {
            console.error(err.message);
            next(err);
        }
    } else {
        res.status(400).send("invalid Request");
    }
}

function removeProductFromCart(req, res, next) {
    const productId = req.params.id;

    try {
        model.removeProductFromCart(productId);
        model.increaseQty(productId);
        res.redirect("/user/cart/1");
    } catch (err) {
        console.error(err.message);
        next(err);
    }
}

function checkout(req, res, next) {
    const id = req.params.id
    const qty = req.body.qty;
    const params = [
        qty,
        id
    ];

    try {
        model.updateQty(params);
        model.checkout(id);
        res.redirect("/user/all-products");
    } catch (err) {
        console.error(err.message);
        next(err);
    }
}

module.exports = {
    allProducts,
    productsBySearch,
    productById,
    viewCart,
    getLogin,
    getRegister,
    postLogin,
    postRegister,
    addProductToCart,
    removeProductFromCart,
    checkout
}