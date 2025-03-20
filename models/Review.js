import mongoose from "mongoose";

import Book from "./Book.js";
import User from "./User.js";

const reviewSchema = new mongoose.Schema({
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    review: {
        type: String,
        required: true
    }
})

export default mongoose.model('Review', reviewSchema)