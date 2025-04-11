import Products from "../models/productModel.js";
import asyncHandler from '../middlewares/asyncHandler.js'


// This controller function fetches a list of products with pagination and search support
const getProducts = asyncHandler(async (req, res) => {

    // Set the number of products to display per page (pagination size)
    const pageSize = 5;

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

    console.log(products)

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

    console.log(req.body)

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

})


export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview
}