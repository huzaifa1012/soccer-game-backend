import express from "express";
import bodyParser from "body-parser";
import { ConnectDB, client } from "../../db.mjs";
const authRoute = express.Router();
const app = express();

app.use(bodyParser.json());

const db = client.db("MyDatabase");
const col_users = db.collection("users");

authRoute.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  if (!phone) {
    return res.status(400).json("Please enter a phone number");
  } else if (phone.length < 9) {
    return res.status(400).json("Phone number can't be less than 9 digits");
  }
  
  if(!password) {
    return res.json("Please enter password to login")
  }
  else if (password.length < 6){
    return res.status(400).json("password  can't be less then 6 digit")
  }

  let filter = { phone, password };
  const loginResp = await col_users.findOne(filter);

  if (loginResp) {
    res.send({ loginResp, message: "Success" });
  } else {
    res.status(400).json("Wrong credentials");
  }
});
authRoute.post("/signup", async (req, res) => {
  const { name, phone, password } = req.body;
  {
    !name
      ? res.send("please enter your name ")
      : name.length < 3 && res.send("name can't be less then 3 letter");
  }
  {
    !phone
      ? res.send("please enter phone number ")
      : phone.length < 9 && res.send("phone number can't be less then 9 digit");
  }
  {
    !password
      ? res.send("please enter password ")
      : password.length < 6 &&
        res.send("password should not be less then 6 digit");
  }
  try {
    let alreadyRegister = await col_users.findOne({
      phone,
    });
    if(alreadyRegister){
      res
        .status(400)
        .json({  message: "you are already signed up" });
      return
    }

    const signupRespone = await col_users.insertOne({
      name: name,
      phone: phone,
      password: password,
    });

    res
      .status(200)
      .send({ signupRespone, message: "you are signed up successfully" });
  } catch (error) {
    console.log("error from signup", error);
  }
});

export default authRoute;
