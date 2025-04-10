import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js'

const userRoute = express.Router()


userRoute.route('/').post(registerUser)

userRoute.route('/auth').post(loginUser)


export default userRoute