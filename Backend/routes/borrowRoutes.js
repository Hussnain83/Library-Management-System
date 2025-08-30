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
import { borrowBook, returnBook, myborrows, allrecords, overDueUsers } from "../controllers/borrowController.js";
import { checkExistingBorrow } from "../middlewares/checkingBorrowBooks.js";
const router = express.Router();


// borrow a book 
router.post("/borrow/:bookId", jwtAuthMiddleware, checkExistingBorrow, borrowBook);
// return a book
router.put("/return/:bookId", jwtAuthMiddleware, returnBook);
// see own borrowed books or maybe history
router.get("/myborrows", jwtAuthMiddleware, myborrows);
// see all the records by admin
router.get("/records", jwtAuthMiddleware, allrecords);
// see overDue users
router.get("/overdue", jwtAuthMiddleware, overDueUsers);
 export default router;