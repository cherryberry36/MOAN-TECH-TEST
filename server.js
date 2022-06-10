const express =  require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRouter = require('./routes/userRoute');
const questionRouter = require('./routes/questionRoute');
const { connectDatabase } = require('./database/db');
const bodyParser = require('body-parser');

connectDatabase()


const app = express()  

 
const port= process.env.PORT || 4444


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', userRouter)
app.use('/api/', questionRouter)

app.listen(port,()=> console.log(`server is running on ${port}`))