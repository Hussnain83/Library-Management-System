import Book  from "../models/Book.js";

export const doubleCheckBook = async (data) => {
  try {
    // find if a book already exists with the same title & author
    const existingBook = await Book.findOne({
      title: data.title,
      author: data.author,
      // you can add more fields if needed
    });
    if(existingBook){
        existingBook.availableCopies += data.availableCopies || 1;
        await existingBook.save();
        return {updated: true, book: existingBook};
    }
    // else false
    return {updated: false};

  } catch (error) {
    console.error("Error checking book:", error);
   throw error; // return false if error
  }
};

