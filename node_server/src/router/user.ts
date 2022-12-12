import express from "express";

import { User } from "./../models/user";
import {
  comparePasswords,
  generateAuthToken,
  generatePassword,
} from "../service/auth";
import { auth } from "../middleware/auth";
import { signupUserDTO } from "../dto/signupUserDTO";
import { signinUserDTO } from "../dto/signinUserDTO";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Hello its workng & I am testing again");
});

router.post("/user/signup", async (req, res) => {
  const dto = req.body as signupUserDTO;
  const userExists = await User.findOne({ email: dto.email });
  if (userExists) {
    return res.status(400).send({
      message: "User exists!",
    });
  }
  try {
    const password = await generatePassword(dto.password);
    const user = {
      ...dto,
      password,
    };
    const createdUser = new User(user);
    await createdUser.save();
    return res.status(201).send({ user: createdUser });
  } catch (error) {
    return res.status(400).send({ message: "Smth went wrong" });
  }
});

router.post("/user/signin", async (req, res) => {
  const dto = req.body as signinUserDTO;
  const [user] = await User.find({ email: dto.email });
  if (!user) {
    return res.status(404).send({
      message: "User not found!",
    });
  }
  try {
    const isCorrectPassword = await comparePasswords(
      dto.password,
      user.password
    );
    if (!isCorrectPassword) {
      return res.status(400).send({
        message: "email or password incorrect!",
      });
    }
    const authToken = generateAuthToken(user._id.toString());
    return res.status(200).send({ authToken });
  } catch (error) {
    return res.status(400).send();
  }
});

router.get("/user/me", auth, (req, res) => {
  return res.status(200).send(req.user);
});

export default router;
