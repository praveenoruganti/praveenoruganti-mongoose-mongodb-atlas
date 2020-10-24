const express = require('express');
const mongoose = require('mongoose');
const foodRouter = require('./routes/foodRoutes.js');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://praveenorugantitech:praveenorugantitech@praveenorugantitech.pbbsv.mongodb.net/foods?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

app.use(foodRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));