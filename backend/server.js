import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())


let port = process.env.PORT


app.listen(port, () => {
    console.log('server started successfully')
})