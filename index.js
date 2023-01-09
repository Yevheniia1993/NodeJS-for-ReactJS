const express = require("express");
var cors = require("cors");

const app = express();
const port = 3010;
var mysql = require("mysql");
app.use(cors());
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "WAVS",
  port: "3306",
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/newList", (req, res) => {
  connection.query(
    "SELECT * FROM Sounds ORDER BY Data DESC ",
    function (error, results, fields) {
      if (error) throw error;
      res.setHeader("Content-Type", "application/json");
      res.json(results);
    }
  );
  // res.send("Hello World!");
});
app.get("/AllList", (req, res) => {
  connection.query(
    "SELECT * FROM Sounds ORDER BY Data ASC ",
    function (error, results, fields) {
      if (error) throw error;
      res.setHeader("Content-Type", "application/json");
      res.json(results);
    }
  );
  // res.send("Hello World!");
});
app.get("/RockList", (req, res) => {
  connection.query(
    "SELECT * FROM `Sounds` WHERE Genere = 'Rock'",
    function (error, results, fields) {
      if (error) throw error;
      res.setHeader("Content-Type", "application/json");
      res.json(results);
    }
  );
});
app.get("/HipHopList", (req, res) => {
  console.log(req.query.Name);
  connection.query(
    "SELECT * FROM `Sounds` WHERE Genere = 'Hip Hop'",
    function (error, results, fields) {
      if (error) throw error;
      res.setHeader("Content-Type", "application/json");
      res.json(results);
    }
  );
});
app.get("/GenereList", (req, res) => {
  connection.query(
    "SELECT DISTINCT Genere FROM `Sounds` ORDER BY Genere",
    function (error, results, fields) {
      if (error) throw error;
      res.setHeader("Content-Type", "application/json");
      res.json(results);
    }
  );
});
app.get("/GenereListSong", (req, res) => {
  console.log(req.query.Genere);
  connection.query(
    `SELECT * FROM Sounds WHERE Genere ='${req.query.Genere}'`,
    function (error, results, fields) {
      if (error) throw error;
      res.setHeader("Content-Type", "application/json");
      res.json(results);
    }
  );
});
app.get("/TempoList", (req, res) => {
  connection.query(
    "SELECT DISTINCT Tempo FROM `Sounds` ORDER BY Tempo;",
    function (error, results, fields) {
      if (error) throw error;
      res.setHeader("Content-Type", "application/json");
      res.json(results);
    }
  );
});
app.get("/GenereQuery", (req, res) => {
  console.log(req.query);
  let key = "";

  let count = 0;
  for (let item in req.query) {
    console.log(item);
    key = item;
    count++;
  }
  console.log(count);
  if (count === 1) {
    connection.query(
      "SELECT * FROM Sounds WHERE " + key + " ='" + req.query[key] + "'",
      function (error, results, fields) {
        if (error) throw error;
        res.setHeader("Content-Type", "application/json");
        res.json(results);
      }
    );
  } else if (count === 2) {
    let first = "";
    let second = "";
    for (let item in req.query) {
      console.log(item);
      key = item;
      console.log(req.query[item]);
    }
    console.log(
      "SELECT * FROM Sounds WHERE " +
        key +
        " ='" +
        req.query[key] +
        "' AND " +
        key +
        " = '" +
        req.query[key] +
        "'"
    );
    connection.query(
      "SELECT * FROM Sounds WHERE " + key + " ='" + req.query[key] + "'",
      function (error, results, fields) {
        if (error) throw error;
        res.setHeader("Content-Type", "application/json");
        res.json(results);
      }
    );
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
