import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    const dbRes = await newUser.save();
    res.status(201).json({
      success: true,
      msg: "User Created",
    });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const validUser = await User.findOne({ username });
    if(!validUser){
        return next(errorHandler('User not Found',404))
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
        return next(errorHandler('Wrong Credentials!',401))
    }
    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
    const {password:pass,...rest} = validUser._doc;
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
    
  } catch (error) {
    next(error);
  }

  // if(!dbRes){
  //     alert("User not found Sign Up first")
  // }else{
  //     const hashedPassword = bcrypt.hashSync(password,10)
  //     if(password===hashedPassword){

  //     }
  // }
};
