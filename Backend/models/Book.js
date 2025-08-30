import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  availableCopies: {
    type: Number,
    required: true,
    default: 1,
  }
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);
export default Book;


// {
//   "_id": "64f1b0e2c123456789abcd02",
//   "title": "Introduction to Algorithms",
//   "author": "Thomas H. Cormen",
//   "category": "Computer Science",
//   "availableCopies": 5,
//   "createdAt": "2025-08-24T12:05:00.000Z",
//   "updatedAt": "2025-08-24T12:05:00.000Z"
// }