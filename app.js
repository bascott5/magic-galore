"use strict";
const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require("./routes/user.route");
const adminRoutes = require("./routes/admin.route");
const { dbClose } = require("./models/db-conn");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views/ejs");

app.use("/user", userRoutes);
app.use('/admin', adminRoutes);

app.get("/", (req, res) => {
  res.redirect("/user/all-products");
});

process.on("SIGINT", cleanUp);
function cleanUp() {
  console.log("Terminate signal received.");
  dbClose();
  console.log("...Closing HTTP server.");
  server.close(() => {
    console.log("...HTTP server closed.");
  })
}

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, function () {
  console.log("Listening: http://localhost:" + PORT);
});