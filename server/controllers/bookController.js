import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userModel.js";
import { Book } from "../models/bookModel.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import mongoose from "mongoose";

export const addBook = catchAsyncErrors(async(req, res, next)=>{
      const {title, author, description, price, quantity} = req.body;
      if(!title || !author || !description || !price || !quantity){
           return next(new ErrorHandler("please enter all fields", 400));
      }
      const book = await Book.create({title, author, description, price, quantity});
      res.status(201).json({
        success: true,
        message: "Book added successfully.",
        book
      })
})


export const deleteBook = catchAsyncErrors(async(req, res, next)=>{
     const {id} = req.params;
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid book ID", 400));
      }
     const book = await Book.findById(id);
     if(!book){
        return next(new ErrorHandler("Book not found", 400));
     }
     await book.deleteOne();
     res.status(200).json({
        success: true,
        message: "book deleted successfully",
      })
})


export const getAllBooks = catchAsyncErrors(async(req, res, next)=>{
    const books = await Book.find();
    res.status(200).json({
       success: true,
       books
     })
})