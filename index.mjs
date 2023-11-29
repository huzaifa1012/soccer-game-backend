import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { ConnectDB } from "./routers/db.mjs";
import mongoose from "mongoose";
// import routerV1 from "./routers/v1/V1_index.mjs";
const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());

ConnectDB();

// const playersCollection = db.collection('playersCollection');

// Schema
const playerSchema = new mongoose.Schema({
  name: { type: String, required: false },
  score: { type: Number, required: false },
});
// Model
const playerModel = mongoose.model("players", playerSchema);
const newUser = new playerModel({
  name: "huzaifahux",
  score: 100,
});

app.post("/players", async (req, res) => {
  try {
    const playerSaved = await newUser.save();
    if (playerSaved) {
      res.send({ message: "player Saved" });
    }
    // console.log('User saved:', result.ops[0]);
    res.send("done");
  } catch (error) {
    console.error("Error saving user:", error);
  }
});

app.get("/", (req, res) => {
  res.send("Connected");
});

// app.use("/api/v1", routerV1);

app.listen(port, () => {
  console.log(`Server is running at PORT ${port}`);
});
