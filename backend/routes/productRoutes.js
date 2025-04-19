import express from 'express'
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview } from '../controllers/productController.js'
import { protect, admin } from '../middlewares/authMiddlewares.js'
import { productParser } from '../config/upload.js'
const productRoute = express.Router()


productRoute
    .route('/')
    .get(getProducts)
    .post(protect, admin, productParser.single('image'), createProduct)

productRoute
    .route('/:id')
    .get(getProductById)
    .put(protect, admin, productParser.single('image'), updateProduct)
    .delete(protect, admin, deleteProduct)

productRoute.route('/:id/review').post(protect, createProductReview)


export default productRoute