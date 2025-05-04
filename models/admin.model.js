"use strict";
const db = require("./db-conn");

function allProducts() {
    const sql = "SELECT * FROM products;";
    const data = db.all(sql);
    return data;
}

function getProduct(id) {
    const sql = "SELECT * FROM products WHERE product_id = ?;";
    const data = db.get(sql, id);
    return data;
}

function insertProduct(params) {
    const sql = "INSERT INTO products (category_id, name, description, set_name, image_url, price, qty) VALUES (?, ?, ?, ?, ?, ?, ?);";
    const info = db.run(sql, params);
    return info;
}

function editProduct(params) {
    const sql = "UPDATE products SET category_id = ?, name = ?, description = ?, set_name = ?, image_url = ?, price = ?, qty = ? WHERE product_id = ?;";
    const info = db.run(sql, params);
    return info;
}

function deleteProduct(id) {
    const sql = "DELETE FROM products WHERE product_id = ?;";
    const info = db.run(sql, id);
    return info;
}

function bulkUploadProduct(params) {
    let values = "";
    for (let i = 0; i < params.length; i++) {
        values += `(${params[i].categoryId}, '${params[i].name}', '${params[i].description}', '${params[i].set}', '${params[i].imageURL}', ${params[i].price}, ${params[i].qty})`;

        if (i < params.length - 1) {
            values += ", ";
        }
    }

    const sql = `INSERT INTO products (category_id, name, description, set_name, image_url, price, qty) VALUES ${values};`;
    const info = db.run(sql, []);
    return info;
}

module.exports = {
    allProducts,
    getProduct,
    insertProduct,
    editProduct,
    deleteProduct,
    bulkUploadProduct
}