"use strict";
const db = require("./db-conn");

function allProducts() {
    const sql = "SELECT * FROM products WHERE qty > 0;";
    const data = db.all(sql);
    return data;
}

function productsBySearch(params) {
    const sql = `SELECT * FROM products WHERE category_id = ? AND (name LIKE ? OR set_name = ?) AND qty > 0;`;
    const data = db.all(sql, params[0], params[1], params[2]);
    return data;
}

function productById(id) {
    const sql = "SELECT * FROM products WHERE product_id = ?;";
    const product = db.get(sql, id);
    return product;
}

function viewCart(id) {
    const sql = "SELECT cp.cart_product_id, cp.product_id, cp.cart_id, p.name, p.description, p.image_url, p.price, cp.qty FROM products p INNER JOIN cart_products cp ON cp.product_id = p.product_id WHERE cart_id = ?;";
    const cart = db.all(sql, id);
    return cart;
}

function checkProductInCart(params) {
    const sql = "SELECT * FROM cart_products WHERE cart_id = ? AND product_id = ?;";
    const inCart = db.get(sql, params[0], params[1]);
    return inCart;
}

function increaseProductQty(params) {
    const sql = "UPDATE cart_products SET qty = qty + 1 WHERE cart_id = ? AND product_id = ?;";
    const info = db.run(sql, params);
    return info;
}

function register(params) {
    const sql = "INSERT INTO users (is_admin, username, email, password, created_at, updated_at) VALUES (false, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);";
    const info = db.run(sql, params);
    return info;
}

function login(params) {
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?;";
    const data = db.get(sql, params[0], params[1]);
    return data;
}

function addProductToCart(params) {
    const sql = "INSERT INTO cart_products(cart_id, product_id, qty) VALUES (?, ?, ?);";
    const info = db.run(sql, params);
    return info;
}

function decreaseQty(productId) {
    const sql = "UPDATE products SET qty = qty - 1 WHERE product_id = ?";
    const info = db.run(sql, productId);
    return info;
}

function increaseQty(productId) {
    const sql = "UPDATE products SET qty = qty + 1 WHERE product_id = ?";
    const info = db.run(sql, productId);
    return info;
}

function updateQty(params) {
    const sql = "UPDATE cart_products SET qty = ? WHERE cart_product_id = ?";
    const info = db.run(sql, params[0], params[1]);
    return info;
}

function removeProductFromCart(id) {
    const sql = "DELETE FROM cart_products WHERE product_id = ?;";
    const info = db.run(sql, id);
    return info;
}

function checkout(id) {
    const sql = "DELETE FROM cart_products WHERE cart_id = ?;";
    const info = db.run(sql, id);
    return info;
}

module.exports = {
    allProducts,
    productsBySearch,
    productById,
    viewCart,
    checkProductInCart,
    increaseProductQty,
    register,
    login,
    addProductToCart,
    decreaseQty,
    increaseQty,
    updateQty,
    removeProductFromCart,
    checkout
}