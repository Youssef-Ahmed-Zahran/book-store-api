const asyncHandler = require("express-async-handler");
const { Book, validateCreateBook, validateUpdateBook } = require("../models/Book");

/**
*   @desc   Get all books
*   @route  /api/books
*   @method  Get
*   @access  public
*/
const getAllBooks = asyncHandler( async (req,res) => {
    // Comparioson Query Operators
    // $eq (equal)
    // $ne (not equal)
    // $lt (less than)
    // $lte (less than and equal)
    // $gt (greater than)
    // $gte (greater than and equal)
    // $in (get the value in array)
    // #nin (not get the value in array)

    const { minPrice, maxPrice } = req.query;

    let books;
    if (minPrice && maxPrice) {
        books = await Book.find({ price: { $gte: minPrice, $lte: maxPrice } })
        .populate("author",["_id","firstName","lastName"]);
    } else {
        books = await Book.find().populate("author",["_id","firstName","lastName"]);
    }
    res.status(200).json(books);
});

/**
*   @desc   Get book by id
*   @route  /api/books/:id
*   @method  Get
*   @access  public
*/
const getBookById = asyncHandler( async (req,res) => {
    const book = await Book.findById(req.params.id).populate("author");
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({message: "book not found"});
    }
});

/**
*   @desc   Create a new book
*   @route  /api/books
*   @method  Post
*   @access  private (only admin)
*/
const createBook = asyncHandler( async (req,res) => {
    const { error } = validateCreateBook(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover,
    });

    const result = await book.save();
    res.status(201).json(result);
});

/**
*   @desc   Update book by id
*   @route  /api/books/:id
*   @method  Put
*   @access  private (only admin)
*/
const updateBook = asyncHandler( async (req,res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                price: req.body.price,
                cover: req.body.cover,
            }
        },
        { new: true });

    res.status(200).json(updatedBook);
});

/**
*   @desc   Delete book by id
*   @route  /api/books/:id
*   @method  Delete
*   @access  private (only admin)
*/
const deleteBook = asyncHandler( async (req,res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "book has been deleted" });
    } else {
        res.status(404).json({message: "book not found"});
    }
});


module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}