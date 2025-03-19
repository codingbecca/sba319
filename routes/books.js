import { Router } from "express";

import Book from "../models/Book.js";

const bookRouter = new Router();

bookRouter
    .route('/')
    .get(async(req, res) => {
        const result = await Book.find({})

        if(result.length === 0) res.status(404).send('Books not found')
        else res.send(result)
    })
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
    .get(async(req, res) => {
        const result = await Book.findById(req.params.bookId)

        if(!result) res.status(404).send('Book not found')
        else res.send(result)
    })
    .patch(async(req, res) => {
        const result = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if(!result) res.status(404).send('Book not found')
        else res.send(result)
    })
    .delete(async(req, res) => {
        const result = await Book.findByIdAndDelete(req.params.id)

        if(!result) res.status(404).send('Book not found')
        else res.send(result)
    })

export default bookRouter;