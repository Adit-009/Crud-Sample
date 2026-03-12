const express = require("express");
const app = express();
const Model = require("../Model/User");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get("/test", (req,res)=>{
  res.send("Server OK");
});


app.get("/view", async (req,res)=>{
  const users = await Model.find().lean();
  res.send(users);
})

// app.get('/view', async (req, res) => {

//   try {
//     const allUsers = await Model.find().lean();

//     console.log("Users from DB:", allUsers); 

//     res.render("view", { users: allUsers || [] });
//   } catch (err) {
//     console.error("VIEW ROUTE ERROR:", err);
//     res.status(500).send("Database error");
//   }
// });

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