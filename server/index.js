import express from 'express';
import dotenv from 'dotenv';

import  Connection  from './database/db.js';

dotenv.config();
const app =express(); //initlizing express as a fuction
const PORT =8000;

app.listen(PORT,()=> console.log("server is running successfully on PORT",PORT))

//to make changes we have to stop and start server agian which is complex .
// so we will instal nodemon(dev dependencies) to do same.
//dev dependencies are not shown in prodection as all nodemon are done to devlopment.

//"start": "node index.js" in package.jason now we will run nodemon instead of node.
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
Connection(USERNAME,PASSWORD);