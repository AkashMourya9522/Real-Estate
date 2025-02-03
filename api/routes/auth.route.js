import express from 'express'
import { signin, signup,googleOAuth,signout } from '../controllers/auth.controller.js'

const route = express.Router()

route.post('/signup',signup)
route.post('/signin',signin)
route.post('/google',googleOAuth)
route.get('/signout',signout)

export default route