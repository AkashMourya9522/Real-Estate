import express from 'express'
import { getUser, test } from '../controllers/user.controller.js'
import { updateUser,deleteUser,showUserListings } from '../controllers/user.controller.js'
import  {verifyToken}  from '../utils/verifyUser.js'
const router = express.Router()

router.get("/test",test)
router.post("/update/:id",verifyToken,updateUser)
router.delete("/delete/:id",verifyToken,deleteUser)
router.get("/listings/:id",verifyToken,showUserListings)
router.get("/:id",verifyToken, getUser)

export default router