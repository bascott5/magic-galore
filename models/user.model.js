"use strict";
const db = require("./db-conn");

function allProducts() {
    const sql = "SELECT * FROM products;";
    const data = db.all(sql);
    return data;
}

function productsBySearch(params) {
    const sql = `SELECT * FROM products WHERE category_id = ${params[0]} AND name LIKE '${params[1]}';`;
    const data = db.all(sql);
    return data;
}

function productById(id) {
    const sql = "SELECT * FROM products WHERE product_id = ?;";
    const product = db.get(sql, id);
    return product;
}

function addProductToCart(params) {
    const sql = "INSERT INTO cart_products(cart_id, product_id, qty) VALUES (?, ?, ?);";
    const info = db.run(sql, params);
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
    addProductToCart,
    removeProductFromCart,
    checkout
}