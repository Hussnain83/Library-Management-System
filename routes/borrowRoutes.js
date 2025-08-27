// // Borrow a book
// router.post("/borrow/:bookId", jwtAuthMiddleware, borrowBook);

// // Return a book
// router.post("/return/:bookId", jwtAuthMiddleware, returnBook);

// // View borrowed books (user’s personal list)
// router.get("/mybooks", jwtAuthMiddleware, getMyBorrowedBooks);
import express from "express";
import User from "../models/User.js";
import Book from "../models/Book.js";
import { jwtAuthMiddleware, generateToken } from "../middlewares/jwt.js";
import BorrowRecord from "../models/BorrowRecord.js";
import { borrowBook } from "../controllers/borrowController.js";
const router = express.Router();


// borrow a book 
 router.post("/:bookId", jwtAuthMiddleware, borrowBook);

 export default router;