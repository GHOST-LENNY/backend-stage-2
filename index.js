require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); //Parse URL-encoded bodies

// Use environment variables for MongoDB connection
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

// Construct the MongoDB connection URI using the environment variables
const uri = `mongodb+srv://${username}:${password}@stage2.lo2tefe.mongodb.net/person`;

// MongoDB Connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}


//validation for render
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//Define Person Schema
const personSchema = new mongoose.Schema({
  name: String,
  track: String,
});

//Define Person Model
const Person = mongoose.model("Person", personSchema);


// CRUD Endpoints
app.post("/api", async (req, res) => {
  try {
    const newPerson = new Person({
      name: req.body.name,
    track: req.body.track
  });
    if (!newPerson.name) {
      res.status(404).json({ error: "name string parameter required" });
    } else {
      await newPerson.save();
      res.status(201).json(newPerson);
    }
  } catch (error) {
    res.status(500).json({ error: "Could not create person" });
  }
});

app.get("/api/:user_id", async (req, res) => {
  try {
    const person = await Person.findById(req.params.user_id);
    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch person" });
  }
});

app.put("/api/:user_id", async (req, res) => {
  try {
    const {user_id} = req.params;
    const {name} = req.body;
    const updatedPerson = await Person.findByIdAndUpdate(
      user_id,
      {name},
      { new: true }
    );
    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json(updatedPerson);
  } catch (error) {
    res.status(500).json({ error: "Could not update person" });
  }
});

app.delete("/api/:user_id", async (req, res) => {
  try {
    const {user_id} = req.params;
    const person = await Person.findByIdAndDelete(user_id);
    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json({ message: "Person deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Could not delete person" });
  }
});

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
