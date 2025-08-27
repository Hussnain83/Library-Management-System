import { jwtAuthMiddleware, generateToken } from "../middlewares/jwt.js";
import User from "../models/User.js";
import { checkAdminRole } from "../middlewares/checkAdminRole.js";
import Book from "../models/Book.js";
import BorrowRecord from "../models/BorrowRecord.js";
import { addDays } from "date-fns";

export const borrowBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user.id;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: "No copies available to borrow" });
    }
    const existingBorrow = await BorrowRecord.findOne({
      user: userId,
      book: bookId,
      returned: false,
    });
    if (!existingBorrow) {
      return res
        .status(400)
        .json({ message: "You have already borrowed this book" });
    }

    const newBorrow = new BorrowRecord({
      user: userId,
      book: bookId,
      borrowedAt: new Date(), // current date
      returnDate: addDays(new Date(), 7), // adds 7 days
    });

    const borrowBooki = await newBorrow.save();
    book.availableCopies -= 1;
    await book.save();
    res
      .status(200)
      .json({ message: "Borrowed book successfully", borrowBooki });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
