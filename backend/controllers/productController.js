import Products from "../models/productModel.js";
import asyncHandler from '../middlewares/asyncHandler.js'


const getProducts = asyncHandler(async (req, res) => {

    const pageSize = 1
    const page = Number(req.query.pageNumber) || 1

    const keywordCondition = req.query.keyword ?
        { name: { $regex: req.query.keyword, $options: 'i' } }
        : {}


    const count = await Products.countDocuments({ ...keywordCondition })

    const products = await Products.find({ ...keywordCondition })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })

})


const getProductById = asyncHandler(async (req, res) => {

})


const createProduct = asyncHandler(async (req, res) => {

    const { name, brand, category, description, price, countInStock } = req.body

    const image = req.file ? req.file.path : null

    const product = await Products.create({
        user: req.user._id,
        name,
        brand,
        category,
        description,
        price,
        countInStock,
        image
    })

    if (product) {
        res.status(201).json(product)
    }

})

const updateProduct = asyncHandler(async (req, res) => {

})

const deleteProduct = asyncHandler(async (req, res) => {

})

const createProductReview = asyncHandler(async (req, res) => {

})


export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview
}