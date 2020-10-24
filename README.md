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
