import pkg from 'cloudinary'
const { v2: cloudinary } = pkg
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const productStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Mern_Ecommers_Products',
        format: () => 'png',
        public_id: Date.now
    }
})


const productParser = multer({ storage: productStorage })

export { productParser }