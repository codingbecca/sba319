import { Router } from "express";

import Book from "../models/Book.js";
import Review from "../models/Review.js";

const bookRouter = new Router();

bookRouter
    .route('/')
    /**
     * GET /api/books returns all books
     */
    .get(async(req, res) => {
        const result = await Book.find({})

        if(result.length === 0) res.status(404).send('Books not found')
        else res.send(result)
    })
    /**
     * POST /api/books creates a new book
     */
    .post(async(req, res) => {
        try {
            const book = new Book(req.body)
            await book.save()
            res.status(201).json(book)
        } catch (e) {
            console.error(e);
            res.status(400).json({message: e.message})
        }
    })

bookRouter
    .route('/:bookId')
    /**
     * GET /api/books/:bookId returns a single book by id
     */
    .get(async(req, res) => {
        const result = await Book.findById(req.params.bookId)

        if(!result) res.status(404).send('Book not found')
        else res.send(result)
    })
    /**
     * PATCH /api/books/:bookId updates a book by id
     */
    .patch(async(req, res) => {
        const result = await Book.findByIdAndUpdate(req.params.bookId, req.body, {new: true})
        console.log(result)

        if(!result) res.status(404).send('Book not found')
        else res.send(result)
    })
    /**
     * DELETE /api/books/:bookId deletes a book by id
     */
    .delete(async(req, res) => {
        const result = await Book.findByIdAndDelete(req.params.bookId)

        if(!result) res.status(404).send('Book not found')
        else res.send('Book successfully deleted')
    })

/**
 * GET /api/books/:bookId/reviews returns all reviews for a specific book
 */
bookRouter.get('/:bookId/reviews', async(req, res) => {
    try {
        const reviews = await Review.find({book_id: req.params.bookId})

        if(!reviews) res.status(404).send('Reviews not found')
        else res.json(reviews)
    } catch (e) {
        console.error(e)
        res.status(400).json({message: e.message})
    }
})


export default bookRouter;