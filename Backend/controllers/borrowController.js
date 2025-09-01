

import { jwtAuthMiddleware, generateToken } from "../middlewares/jwt.js";
import User from "../models/User.js";
import { checkAdminRole } from "../middlewares/checkAdminRole.js";
import Book from "../models/Book.js";
import BorrowRecord from "../models/BorrowRecord.js";
import { addDays } from "date-fns";
import { returnBookUpdate } from "../middlewares/returnBookUpdate.js";

// borrow a book
export const borrowBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user.id;

    if ((await checkAdminRole(userId))) {
       return res.status(403).json({ message: "This is not for admin" });
     }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: "No copies available to borrow" });
    }

    // checkingBorrowBooks middleware will check if the book is already borrowed or not
    const newBorrow = new BorrowRecord({
      user: userId,
      book: bookId,
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

// return a book
export const returnBook = async (req, res) => {
  try {
    const adminId = req.user.id;
    const bookId = req.params.bookId;
    const {userId} = req.body;
     if (!(await checkAdminRole(adminId))) {
       return res.status(403).json({ message: "This is only for admin" });
     }


    const ifBorrow = await BorrowRecord.findOne({
      user: userId,
      book: bookId,
      returnAt: null,
    });

    if (!ifBorrow) {
      return res
        .status(404)
        .json({ message: "No active borrow record found for that book" });
    }

    ifBorrow.returnAt = new Date();
    ifBorrow.status = "returned";
    await ifBorrow.save();
    console.log("Borrow Record updated");

    returnBookUpdate(bookId);// update the copies of book
    res.status(200).json({message: "Book returned successfully", ifBorrow})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// GET /my-borrows (user) → See borrowed books

export const myborrows = async (req, res) => {
  try{
    const userId = req.user.id;
    const record = await BorrowRecord.find({user: userId}).populate("book");
    if(!record){
      return res.status(401).json("No record available");
    }
    console.log("record checked ");
    res.status(200).json({record: record});    
  }
  catch(error){
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// get all the users 

export const allrecords = async (req, res)=> {
  try {
    const userId = req.user.id;
     if (!(await checkAdminRole(userId))) {
       return res.status(403).json({ message: "This is only for admin" });
     }
     const users = await BorrowRecord.find().sort({status: 1}); // 1 for ascending
    // "borrowed" comes before "returned" alphabetically

     console.log("Users fetched");
     res.status(200).json({users: users});
    
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
    
  }
};

// get overdue users

export const overDueUsers = async (req, res) => {
  try {
    const adminId = req.user.id;

    // Only admin can check overdue records
    if (!(await checkAdminRole(adminId))) {
      return res.status(403).json({ message: "This is only for admin" });
    }

    const today = new Date();

    const overdueRecords = await BorrowRecord.find({
      status: "borrowed",
      returnDate: { $lt: today }, // returnDate already passed
    })
      .populate("user", "name email") // show user info
      .populate("book", "title author"); // show book info

      if(overdueRecords.length === 0){
      return res.status(404).json({ message: "No overdue records found" });
      }

    res.json({
      message: "Overdue records fetched successfully",
      overdueRecords,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching overdue records", error });
  }
}