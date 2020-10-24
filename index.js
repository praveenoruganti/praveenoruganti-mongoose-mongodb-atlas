const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes.js');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://praveenorugantitech:praveenorugantitech@praveenorugantitech.pbbsv.mongodb.net/user?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

app.use(userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));