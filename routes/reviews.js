import { Router } from "express";

import Review from "../models/Review.js";

const reviewRouter = new Router();

reviewRouter
    .route('/')
    .get(async(req, res) => {
        try {
            const result = await Review.find({})

            if(result.length === 0) res.status(404).send('Reviews not found')
            else res.send(result)
        } catch (e) {
            console.error(e)
            res.status(400).json({message: e.message})
        }
    })
    .post(async (req, res) => {
        try {
            const review = new Review(req.body)
            await review.save()
            res.status(201).json(review)
        } catch (e) {
            console.error(e)
            res.status(400).json({message: e.message})
        }
    })

reviewRouter
    .route('/:reviewId')
    .get( async(req, res) => {
        try {
            const result = await Review.findById(req.params.reviewId)

            if(!result) res.status(404).send('Review not found')
            else res.json(result)
        } catch (e) {
            console.error(e)
            res.status(400).json({message: e.message})
        }
    })
    .patch(async(req, res) => {
        try {
            const result = await Review.findByIdAndUpdate(req.params.reviewId, req.body, {new: true})

            if(!result) res.status(404).send('Review not found')
            else res.json(result)
        } catch (e) {
            console.error(e)
            res.status(400).json({message: e.message})
        }
    })
    .delete(async(req, res) => {
        try {
            const result = await Review.findByIdAndDelete(req.params.reviewId)

            if(!result) res.status(404).send('Review not found')
            else res.send('Review successfully deleted')
        } catch (e) {
            console.error(e)
            res.status(400).json({message: e.message})
        }
    })

reviewRouter.get('/users/:userId', async(req, res) => {
    try {
        const reviews = await Review.find({user_id: req.params.userId})

        if(!reviews) res.status(404).send('Reviews not found')
        else res.json(reviews)
    } catch (e) {
        console.error(e)
        res.status(400).json({message: e.message})
    }
})

export default reviewRouter;