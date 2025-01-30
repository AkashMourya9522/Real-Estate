import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const test = (req, res) => {
  res.json({
    msg: "The test works",
  });
};

export const updateUser = async (req, res, next) => {
  console.log("this is the form data received",req.body)
  const userId = req.userId;
  if (userId != req.params.id)
    return next(errorHandler("You can update Your Own Account Only!", 401));
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        username: req.body.username,
        password:req.body.password,
        email: req.body.email,
        photo: req.body.photo,
      },
    },
    { new: true }
  );
  console.log(updatedUser);
  
  const {password,...rest} = updatedUser._doc;
  res.status(200).json(rest)
};
