"use strict";
const db = require("./db-conn");

function insertProduct(params) {
    const sql = "INSERT INTO products (category_id, name, description, image_url, price) VALUES (?, ?, ?, ?, ?);";
    const info = db.run(sql, params);
    return info;
}

function editProduct(params) {
    const sql = "UPDATE products SET name = ?, description = ?, image_url = ?, price = ? WHERE product_id = ?;";
    const info = db.run(sql, params);
    return info;
}

function bulkUploadProduct(params) {
    let values = "";
    for (let i = 0; i < params.length; i++) {
        values += `(${params[i].categoryId}, '${params[i].name}', '${params[i].description}', '${params[i].imageURL}', ${params[i].price})`;

        if (i < params.length - 1) {
            values += ", ";
        }
    }

    const sql = `INSERT INTO products (category_id, name, description, image_url, price) VALUES ${values};`;
    const info = db.run(sql, []);
    return info;
}

module.exports = {
    insertProduct,
    editProduct,
    bulkUploadProduct
}