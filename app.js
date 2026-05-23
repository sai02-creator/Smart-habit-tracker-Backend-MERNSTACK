const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "ROOT WORKING",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
  });
});

module.exports = app;