import express from "express";
import {PORT,MONGODBURL} from "./config.js"
import mongoose from 'mongoose'
import {Book} from './models/bookModel.js'
const app =express();
app.use(express.json());

//Home route
app.get('/', (req, res) => {
    res.send("Hii buddy")
})

//Route to add book in database
app.post('/books', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        
        if (!title || !author || !publishYear) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        
        const newBook = {
            title,
            author,
            publishYear,
        };
        
        const book = await Book.create(newBook);
        return res.status(201).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route to send all books
app.get('/books',async (req,res)=>{
    try{
        const books =await Book.find({})
        return res.status(200).json(books)
    }
    catch(error){
        console.log(error);
        res.status(500).send({message:error.message});

    }
})

//Route to search book by id
app.get('/books/:id',async (req,res)=>{
    try{
        const {id} =req.params;
        const book =await Book.findById(id)
        return res.status(200).json(book);
    }
    catch(error){
        console.log(error);
        res.status(500).send({message:error.message});

    }
})

//Route to update book with given id
app.put('/books/:id',async (req,res)=>{
    const {title,author,publishYear} = req.body;
    try{
        if(!title || !author || !publishYear){
            return res.status(400).send({
                message:'Send all the required fields: title, author , publishYear'
            })
        }
        const {id} = req.params;
        const result =await Book.findByIdAndUpdate(id,req.body);
        if(!result){
            return res.status(404).json({message:"book not found"});
        }
        return res.status(200).json({message:"Book updated successfully"})   
    }
    catch(error){
        console.log(error);
        res.status(500).send({message:error.message});

    }
})

//Route to delete a book
app.delete('/books/:id',async (req,res)=>{
    try{
        const {id} =req.params;
        const result =await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message:"book not found"});    
        }
        return res.status(200).json({message:"Book deleted successfully"});

    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
})



mongoose
.connect(MONGODBURL)
.then(()=>{
    console.log('App connected to database');
    app.listen(PORT,()=>{
        console.log(`App is listening to port ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
})

