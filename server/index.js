import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import  Connection  from './database/db.js';
import   Router  from './routes/route.js';

dotenv.config();


const app =express(); //initlizing express as a fuction

app.use(cors());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({ extended: true }));



//use the router for other routes
app.use('/' , Router);

const PORT =8000;

app.listen(PORT,()=> console.log("server is running successfully on PORT",PORT))

//to make changes we have to stop and start server agian which is complex .
// so we will instal nodemon(dev dependencies) to do same.
//dev dependencies are not shown in prodection as all nodemon are done to devlopment.

//"start": "node index.js" in package.jason now we will run nodemon instead of node.
const USERNAME = process.env.MONGO_USERNAME;
const PASSWORD = process.env.MONGO_PASSWORD;
Connection(USERNAME,PASSWORD);