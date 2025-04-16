import express from 'express'
import { loginUser, logout, registerUser } from '../controllers/userController.js'

const userRoute = express.Router()


userRoute.route('/').post(registerUser)

userRoute.route('/auth').post(loginUser)

userRoute.route('/logout').post(logout)


export default userRoute