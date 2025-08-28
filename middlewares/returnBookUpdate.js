import Book  from "../models/Book.js";

export const returnBookUpdate = async (data) => {
    const book = await Book.findById(data);
    if(book){
        book.availableCopies += 1;
        await book.save();
        console.log("Book updated successfully");        
    }

}
