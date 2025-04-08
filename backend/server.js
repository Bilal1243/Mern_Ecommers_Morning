import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDb from './config/db.js'
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'

dotenv.config()

const app = express()

connectDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())


let port = process.env.PORT



app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log('server started successfully')
})