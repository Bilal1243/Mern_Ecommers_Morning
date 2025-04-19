import Products from "../models/productModel.js";
import asyncHandler from '../middlewares/asyncHandler.js'


// This controller function fetches a list of products with pagination and search support
const getProducts = asyncHandler(async (req, res) => {

    // Set the number of products to display per page (pagination size)
    const pageSize = 4;

    // Get the page number from the query string (e.g., ?pageNumber=2), default is 1
    const page = Number(req.query.pageNumber) || 1;

    // If there's a keyword in the query string (e.g., ?keyword=shirt), create a search condition
    // It will match the product name using regular expression (case-insensitive)
    const keywordCondition = req.query.keyword ?
        { name: { $regex: req.query.keyword, $options: 'i' } }
        : {}; // If no keyword, match all products

    // Count how many products match the search condition
    const count = await Products.countDocuments({ ...keywordCondition });

    // Fetch products from the database that match the keywordCondition
    // Apply pagination using limit and skip
    const products = await Products.find({ ...keywordCondition })
        .limit(pageSize)                            // Limit the number of products per page
        .skip(pageSize * (page - 1));               // Skip products from previous pages

    // Send the result back as JSON
    res.json({
        products,                                   // The list of products for the current page
        page,                                       // Current page number
        pages: Math.ceil(count / pageSize)          // Total number of pages
    });

});



const getProductById = asyncHandler(async (req, res) => {

    let product = await Products.findById(req.params.id)

    if (product) {
        return res.json(product)
    }
    else {
        res.status(404)
        throw new Error('Product Not Found')
    }

})


// This controller function is used to create a new product in the database
const createProduct = asyncHandler(async (req, res) => {

    // Destructure the required fields from the request body
    const { name, brand, category, description, price, countInStock } = req.body;


    // Check if a file (image) was uploaded, and get its path
    // If no image was uploaded, image will be null
    const image = req.file ? req.file.path : null;

    // Create a new product in the database using the provided data
    const product = await Products.create({
        user: req.user._id,         // The user who is creating the product (assumes auth middleware)
        name,                       // Product name
        brand,                      // Product brand
        category,                   // Product category
        description,                // Product description
        price,                      // Product price
        countInStock,               // Number of items in stock
        image                       // Image path (if uploaded)
    });

    // If product is successfully created, send a 201 status and return the product in JSON
    if (product) {
        res.status(201).json(product);
    }

});


const updateProduct = asyncHandler(async (req, res) => {

    let { name, price, category, countInStock, brand, description } = req.body

    let product = await Products.findOne({ _id: req.params.id })

    if (product) {
        product.name = name || product.name
        product.price = price || product.price
        product.brand = brand || product.brand
        product.category = category || product.category
        product.countInStock = countInStock || product.countInStock
        product.description = description || product.description
        product.image = req.file ? req.file.path : product.image

        const updatedProduct = await product.save()

        res.json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

const deleteProduct = asyncHandler(async (req, res) => {

    let product = await Products.findById(req.params.id)

    if (product) {
        await Products.deleteOne({ _id: product._id })
        res.json({ message: 'product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

const createProductReview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body

    const product = await Products.findById(req.params.id)

    if (product) {

        const alreadyReviewed = product.reviews.find((item) => item.user.toString() == req.user._id.toString())

        if (alreadyReviewed) {
            res.status(404)
            throw new Error('Product Already Reviewed')
        }

        const review = {
            name: req.user.name,
            rating,
            comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating =
            product.reviews.reduce((acc, item) => item.rating, 0) /
            product.reviews.length

        const updateProduct = await product.save()

        res.status(201).json(updateProduct)

    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})


const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Products.find()
    res.json(products)
})


export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getAllProducts
}