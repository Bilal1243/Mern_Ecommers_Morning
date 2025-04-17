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


export { registerUser, loginUser, updateUserProfile, logout }
