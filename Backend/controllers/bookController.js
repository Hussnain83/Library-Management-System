import { jwtAuthMiddleware, generateToken } from "../middlewares/jwt.js";
import User  from "../models/User.js";
import Book from "../models/Book.js";
import { checkAdminRole } from "../middlewares/checkAdminRole.js";
import { doubleCheckBook } from "../middlewares/doubleCheckBook.js";


// adding a book
export const addBooks = async (req, res) =>{
    try {
        const userId = req.user.id;
        if(! await checkAdminRole(userId)){
            return res.status(403).json({message: "This is only for admin"});
        }
        const data = req.body;
        const result = await doubleCheckBook(data);
        if(result.updated){
             console.log("Book already existed");
            return res.status(200).json({message:"Book already existed, copies updated", book: result.book });
            
        }
        const newBook = new Book(data);
        const response = await newBook.save();
        console.log("Book data saved");
        res.status(200).json({response: response, message: "Book got saved"});
        
    } 
    catch (error) {
    console.log(error);    
    res.status(500).json({error: "Internal server error"});
    }
}

// updating a book
export const updateBooks = async (req, res) => {
    try{
        const userId = req.user.id;
        if(! await checkAdminRole(userId)){
            return res.status(403).json({message: "This is only for admin"});
        }


        const bookId = req.params.bookId;
        const updatedData = req.body;
        const updatedBooks = await Book.findByIdAndUpdate(bookId, updatedData,
          { 
            new: true,
            runValidators: true 
          });
          if(!updatedBooks){
            return res.status(404).json({errro: "Book not found"});
          }
          console.log("Books updated successfully");
          res.status(200).json({response: updatedBooks});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "Internal server error"});
        
    }
}

// get all books

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({books: books});        
    } 
    catch (error) {
         console.log(error);
         res.status(500).json({error: "Internal server error"});
    }
}

// get a single book by id

export const getaBook = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);
        if(!book){
            console.log("Book not found");
            return res.status(404).json({error: "Book not found"});           
        }
        console.log("Book found successfully");
        res.status(200).json({book: book})


    }
    catch(error){
         console.log(error);
         res.status(500).json({error: "Internal server error"});
    }
}

// delete a book by admin 

export const deleteBook = async (req, res) => {
    try {
        const userId = req.user.id;
         if(! await checkAdminRole(userId)){
            return res.status(403).json({message: "This is only for admin"});
        }
        const bookId = req.params.bookId;
        const removeBook = await Book.findByIdAndDelete(bookId);
         if (!removeBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        console.log("Book successfully deleted");
        res.status(200).json({removeBook: removeBook, message: `${bookId} deleted`});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
        
    }
}