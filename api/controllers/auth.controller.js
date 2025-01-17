import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({
    $or:[
      {username},{email}
    ]
  })
  if(userExists){
    return next(errorHandler('User With Username Already Exists. Please Use Different Username ',401))
  }
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
        return next(errorHandler('User not Found. Please Sign Up First',404))
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
};

export const googleOAuth = async (req,res,next)=>{
  const {username,email,photoURL} = req.body;
  const user = await User.findOne({email})
  if(user){
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
    const {password:pass,...rest} = user._doc;
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
  }else{
    const generatePassword = Math.random().toString(36).slice(-8)
    const hashedPassword = bcrypt.hashSync(generatePassword,10)
    const newUser = new User({username:username,password:hashedPassword,email:email,photo:photoURL})
    await newUser.save()
    const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET)
    const {password:pass,...rest} = newUser._doc;
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
  }
    console.log(req.body);
    
}
