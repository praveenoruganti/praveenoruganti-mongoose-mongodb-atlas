## Praveen Oruganti Mongoose Mongodb Atlas

Mongoose is one of the fundamental tools for manipulating data for a Node.js/MongoDB backend. 
Let see the basic ways of using Mongoose and even using it with the MongoDB Atlas remote database.

## Prerequisites
Since we値l be using Express to set up a basic server and be setting up a very basic REST Api without any authentication, 
but the routing will be asynchronous and we値l be using async/await functions, which you can freshen up on here.

## MongoDB Atlas Setup

We値l need to get setup with MongoDB Atlas. Here痴 a summary of the steps to get started:

- Setup an account
- Hit Build a Cluster
- Go to Database Access and hit Add New User. Add a username and password, if you autogenerate a password make sure you copy it, we値l need it later.
- Go to Network Access, hit Add IP Address, and hit Add Current IP Address, then confirm.
- Go to Clusters, if your cluster build is done then hit Connect, Connect Your Application, and copy the line of code it gives you
- Everything else with MongoDB Atlas will be handled on our end with in Node.js.

## Coding

### index.js

```JS
const express = require('express');
const mongoose = require('mongoose');
const foodRouter = require('./routes/foodRoutes.js');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://praveenorugantitech:praveenorugantitech@praveenorugantitech.pbbsv.mongodb.net/food?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

app.use(foodRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

```

## Schemas
First we need to have a pattern to structure our data onto, and these patterns are referred to as schemas. Schemas allow us to decide exactly what data we want, and what options we want the data to have as an object.

With that basic pattern in place we値l use the mongoose.model method to make it usable with actual data and export it as a variable we can use in foodRoutes.js.

### Options
- type Sets whether it is a String, Number, Date, Boolean, Array, or a Map (an object).
- required (Boolean) Return an error if not provided.
- trim (Boolean) Removes any extra whitespace.
- uppercase (Boolean) Converts to uppercase.
- lowercase (Boolean) Converts to lowercase.
- validate Sets a function to determine if the result is acceptable.
- default Sets the default if no data is given.

### food.js

```JS
const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  calories: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Negative calories aren't real.");
    }
  },
});

const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;
```

## Query Functions
While there are many querying functions available, which you can find here, here are the ones we値l be using in this instance:

= find() Returns all objects with matching parameters so .find({ name: fish }) would return every object named fish and an empty object will return everything.
- save() Save it to our Atlas database.
- findByIdAndDelete() Takes the objects id and removes from the database.
- findByIdAndUpdate Takes the objects id and an object to replace it with.
- deleteOne() and deleteMany() Removes the first or all items from the database.

## Read All
Once we have our data model set up we can start setting up basic routes to use it.

We値l start by getting all foods in the database, which should just be an empty array right now. Since Mongoose functions are asynchronous, we値l be using async/await.

Once we have the data we値l use a try/catch block to send it back to and so that we can see that things are working using Postman.

### foodRoutes.js

```JS
const express = require('express');
const foodModel = require('../models/food');
const app = express();

app.get('/foods', async (req, res) => {
  const foods = await foodModel.find({});

  try {
    res.send(foods);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/food', async (req, res) => {
  const food = new foodModel(req.body);

  try {
    await food.save();
    res.send(food);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/food/:id', async (req, res) => {
  try {
    const food = await foodModel.findByIdAndDelete(req.params.id)

    if (!food) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
});

app.patch('/food/:id', async (req, res) => {
  try {
    await foodModel.findByIdAndUpdate(req.params.id, req.body)
    await foodModel.save()
    res.send(food)
  } catch (err) {
    res.status(500).send(err)
  }
});


module.exports = app

```

