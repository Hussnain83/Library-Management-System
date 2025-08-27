import express from "express";
import User from "../models/User.js";
import Book from "../models/Book.js";
import { jwtAuthMiddleware, generateToken } from "../middlewares/jwt.js";
import { addBooks, updateBooks, getAllBooks, getaBook, deleteBook } from "../controllers/bookController.js";
const router = express.Router();


// adding a book
router.post("/addBook", jwtAuthMiddleware, addBooks);
// update a book
router.put("/:bookId", jwtAuthMiddleware, updateBooks);
// get all books
router.get("/books", jwtAuthMiddleware, getAllBooks);
// get a single book by id
router.get("/:bookId", jwtAuthMiddleware, getaBook);
// admin can delete a book
router.delete("/:bookId", jwtAuthMiddleware, deleteBook);


export default router;
