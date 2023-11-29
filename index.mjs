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

// Schema
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: String, required: true },
  appearances: { type: Number, required: false },
  goals: { type: Number, required: false },
  assists: { type: Number, required: false },
  crossAccuracy: { type: Number, required: false },
  keyPasses: { type: Number, required: false },
  tackles: { type: Number, required: false },
  score: { type: Number, required: false },
});
// Model

const playerModel = mongoose.model("players", playerSchema);

app.post("/addPlayer", async (req, res) => {
  const {
    name,
    team,
    score,
    appearances,
    goals,
    assists,
    crossAccuracy,
    keyPasses,
    tackles,
  } = req.body;
  const addPlayer = new playerModel({
    name,
    team,
    score,
    appearances,
    goals,
    assists,
    crossAccuracy,
    keyPasses,
    tackles,
  });
  try {
    const saved = await addPlayer.save();
    {
      saved && console.log("player saved");
      res.send({ message: "player Saved", playerData: req.body });
    }
  } catch (error) {
    console.error("Error saving user:", error);
    res.send({ error: "something wrong" });
  }
});

app.get("/", (req, res) => {
  res.send("Connected");
});

// app.use("/api/v1", routerV1);

app.listen(port, () => {
  console.log(`Server is running at PORT ${port}`);
});
