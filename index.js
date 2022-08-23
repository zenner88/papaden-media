#!/usr/bin/env node
const express = require("express");
const app = express();
const port = 3000;
const banner_link = require("./routes/banner_link");
const images1 = require("./routes/images1");
const images2 = require("./routes/images2");
app.use(express.json());
app.use(express.urlencoded({extended: true,}));

var serveIndex = require('serve-index');
app.use('/images', express.static(__dirname + '/uploads'), serveIndex(__dirname + '/uploads'));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/banner_link", banner_link);
app.use("/upload-image1", images1);
app.use("/upload-image2", images2);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Papaden Media listening at http://localhost:${port}`);
});