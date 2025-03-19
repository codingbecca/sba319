import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    isbn: {
        type: String,
        unique: [true, "ISBN must be unique"],
    },
    title: {
        type: String,
        required: true
    },
    author: String,
    description: String,
    genre: String,
    publicationYear: {
        type: Number,
        min: 868 //the first book was published in 868 using woodblock printing
    }
})

export default mongoose.model('Book', bookSchema)