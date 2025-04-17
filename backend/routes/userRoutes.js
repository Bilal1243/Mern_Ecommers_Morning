import express from 'express'
import { deleteUser, getUserById, getUsers, loginUser, logout, registerUser, updateUser, updateUserProfile } from '../controllers/userController.js'
import { admin, protect } from '../middlewares/authMiddlewares.js'

const userRoute = express.Router()


userRoute.route('/').post(registerUser).get(protect , admin , getUsers)

userRoute.route('/auth').post(loginUser)

userRoute.route('/profile').put(protect, updateUserProfile)

userRoute.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)

userRoute.route('/logout').post(logout)


export default userRoute