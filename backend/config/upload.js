import pkg from 'cloudinary'
const { v2: cloudinary } = pkg
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'


cloudinary.config({
    cloud_name: "du25wfdfx",
    api_key: '799793882337387',
    api_secret: "QoJyv84AhZ9Pwur_J_d6xxTbx6o"
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