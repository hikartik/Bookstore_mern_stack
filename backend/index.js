import express from "express";
import {PORT,MONGODBURL} from "./config.js"
import mongoose from 'mongoose'
import {Book} from './models/bookModel.js'
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'


const app =express();
app.use(express.json());

//Home route
app.get('/', (req, res) => {
    res.send("Hii buddy")
})

app.use('/books',booksRoute)


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

