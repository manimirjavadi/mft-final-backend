const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

// Serve static images
app.use("/images", express.static("images"));

// Load food data from JSON file
const foods = require("./data/foods.json");

// GET /foods - Get all foods
app.get("/foods", (req, res) => {
  res.json(foods);
});

// GET /foods/:category - Get foods by category
app.get("/foods/:category", (req, res) => {
  const category = req.params.category;
  const filteredFoods = foods.filter((food) => food.category === category);
  res.json(filteredFoods);
});

// GET /foods/:id - Get food by ID
app.get("/foods/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const food = foods.find((food) => food.id === id);
  if (!food) {
    res.status(404).send({ message: "Food not found" });
  } else {
    res.json(food);
  }
});

// Start server
const port = 3131;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
