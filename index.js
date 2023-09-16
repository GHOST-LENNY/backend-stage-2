require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.json());


// Use environment variables for MongoDB connection
const username = process.env.MONGODB_USERNAME;
// console.log('MongoDB username:', username);
const password = process.env.MONGODB_PASSWORD;


// MongoDB Connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${username}:${password}@stage2.lo2tefe.mongodb.net/person`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

}


//Define Person Schema
const personSchema = new mongoose.Schema({
  name: String,
  track: String,
});

//Define Person Model
const Person = mongoose.model("Person", personSchema);

const David = new Person({ name: "David", track: "Design" });
console.log(David);
// David.save();

// const Femi = new Person({ name: "Femi", track: "Backend" });
// console.log(Femi);
// Femi.save();

// const Chinwe = new Person({ name: "Chinwe", track: "Frontend" });
// console.log(Chinwe);
// Chinwe.save();

const Habibi = new Person({ name: "Habibi", track: "Devops" });
console.log(Habibi);
// Habibi.save();




// CRUD Endpoints
app.post("/api", async (req, res) => {
  try {
    const person = new Person(req.body);
    if (!person) {
      res.status(404).json({ error: "name string parameter required" });
    } else {
      await person.save();
      res.status(201).json(person);
    }
  } catch (error) {
    res.status(500).json({ error: "Could not create person" });
  }
});

app.get('/api/:user_id', async (req, res) => {
    try {
      const person = await Person.findById(req.params.user_id);
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.json(person);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch person' });
    }
  });
  
  app.put('/api/:user_id', async (req, res) => {
    try {
      const updatedPerson = await Person.findByIdAndUpdate(
        req.params.user_id,
        req.body,
        { new: true }
      );
      if (!updatedPerson) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.json(updatedPerson);
    } catch (error) {
      res.status(500).json({ error: 'Could not update person' });
    }
  });
  
  app.delete('/api/:user_id', async (req, res) => {
    try {
      const person = await Person.findByIdAndDelete(req.params.user_id);
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.json({ message: 'Person deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Could not delete person' });
    }
  });

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});