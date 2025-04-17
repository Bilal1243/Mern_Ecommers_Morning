import Users from '../models/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'

// register user
const registerUser = asyncHandler(async (req, res) => {

    let { name, email, password } = req.body


    const salt = await bcrypt.genSalt(10)
    const encrycptedPassword = await bcrypt.hash(password, salt)


    const userExists = await Users.findOne({ email: email })

    if (userExists) {
        return res.status(400).json({ message: 'user already exists' })
    }

    const user = await Users.create({
        name,
        email,
        password: encrycptedPassword
    })


    if (user) {
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }
    else {
        return res.status(400).json({ message: 'invalid user data' })
    }

})


// login user
const loginUser = asyncHandler(async (req, res) => {

    let { email, password } = req.body

    const user = await Users.findOne({ email: email })

    if (user && await user.matchPassword(password)) {

        generateToken(res, user._id)

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
    else {
        return res.status(400).json({ message: 'invalid user data' })
    }

})


// for updating profile
const updateUserProfile = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    const user = await Users.findById(req.user._id)

    if (user) {
        user.name = name || user.name
        user.email = email || user.email

        if (password) {
            const salt = await bcrypt.genSalt(10)
            const encrycptedPassword = await bcrypt.hash(password, salt)

            user.password = encrycptedPassword
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }

})


const logout = asyncHandler(async (req, res) => {
    res.cookie('jwt', "", {
        httpOnly: true,
        expiresIn: new Date(0)
    })

    res.status(200).json({ message: 'logout success' })
})


// To get all users
// only for admin
const getUsers = asyncHandler(async (req, res) => {

    const users = await Users.find()

    res.json(users)

})

// to delete a user
// only for admin
const deleteUser = asyncHandler(async (req, res) => {

    const user = await Users.findById(req.params.id)

    if (user) {

        if (user.isAdmin) {
            res.status(400)
            throw new Error("can not delete admin");
        }

        await Users.deleteOne({ _id: user._id })

        res.json({ message: 'user removed' })

    } else {
        res.status(404)
        throw new Error("user not found");
    }

})

// Get a user by id
// only for admin
const getUserById = asyncHandler(async (req, res) => {

    const user = await Users.findById(req.params.id)

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error("user not found");
    }

})


// update user
// only for admin
const updateUser = asyncHandler(async (req, res) => {

    const { name, email, isAdmin } = req.body

    const user = await Users.findById(req.params.id)

    if (user) {

        user.name = name || user.name
        user.email = email || user.email
        user.isAdmin = Boolean(isAdmin) || user.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })

    } else {
        res.status(404)
        throw new Error("user not found");
    }

})



export { registerUser, loginUser, updateUserProfile, logout, getUsers, getUserById, deleteUser, updateUser }
