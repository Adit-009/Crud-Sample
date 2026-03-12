const express = require("express");
const app = express();
const Model = require("../Model/User");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/submit", async (req, res) => {
  const { name, email, age } = req.body;
  await Model.create({
    name,
    email,
    age,
  });
  res.redirect("/view");
});

app.get('/view',async (req,res)=>{
    const allUsers = await Model.find() 
    res.render("view",{users: allUsers})
})

app.post('/delete/:id',async(req,res)=>{
    console.log(req.params.id)
    const user = await Model.findByIdAndDelete(req.params.id)
    res.redirect('/view')
})

module.exports = app