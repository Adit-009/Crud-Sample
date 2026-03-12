const express = require("express");
const app = express();
const Model = require("../Model/User");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    await Model.create({
      name,
      email,
      age,
    });

    res.redirect("/view");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving user");
  }
});

app.get("/view", async (req, res) => {
  try {
    const allUsers = await Model.find();
    res.render("view", { users: allUsers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading users");
  }
});

app.post("/delete/:id", async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.redirect("/view");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});

module.exports = app;