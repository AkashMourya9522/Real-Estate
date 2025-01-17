import express from 'express'
import { signin, signup,googleOAuth } from '../controllers/auth.controller.js'

const route = express.Router()

route.post('/signup',signup)
route.post('/signin',signin)
route.post('/google',googleOAuth)

export default route