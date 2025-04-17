import express from 'express'
import { loginUser, logout, registerUser, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddlewares.js'

const userRoute = express.Router()


userRoute.route('/').post(registerUser)

userRoute.route('/auth').post(loginUser)

userRoute.route('/profile').put(protect, updateUserProfile)

userRoute.route('/logout').post(logout)


export default userRoute