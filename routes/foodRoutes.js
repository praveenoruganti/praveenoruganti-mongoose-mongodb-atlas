const express = require('express');
const foodModel = require('../models/food');
const app = express();

app.get('/foods', (req, res) => {
  const foods = await foodModel.find({});

  try {
    res.send(foods);
  } catch (err) {
    res.status(500).send(err);
  }
})

app.post('/food', (req, res) => {
  const food = new foodModel(req.body);

  try {
    food.save();
    res.send(food);
  } catch (err) {
    res.status(500).send(err);
  }
})

app.delete('/food/:id', (req, res) => {
  try {
    const food = foodModel.findByIdAndDelete(req.params.id)

    if (!food) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

app.patch('/food/:id', (req, res) => {
  try {
    foodModel.findByIdAndUpdate(req.params.id, req.body)
    foodModel.save()
    res.send(food)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = app