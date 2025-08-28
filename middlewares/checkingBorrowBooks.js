import BorrowRecord from "../models/BorrowRecord.js";

// Middleware to check if user already borrowed the book
export const checkExistingBorrow = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user.id;

    const existingBorrow = await BorrowRecord.findOne({
      user: userId,
      book: bookId,
      status: "borrowed"
    });

    if (existingBorrow) {
        console.log("You have already borrowed this book");
        
      return res
        .status(400)
        .json({ message: "You have already borrowed this book" });
    }

    // If no existing borrow found, continue to next middleware/route
    next();
  } catch (error) {
    console.log("Error checking existing borrow:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};