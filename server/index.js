import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';



import  Connection  from './database/db.js';
import   Router  from './routes/route.js';

dotenv.config();


const app =express(); //initlizing express as a fuction


app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true // Enable cookies or HTTP authentication if needed
}));
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    })
    const mailOption = {

        from: email,
        to: 'sanesh.pushkarna114994@marwadiuniversity.ac.in', // My email
        subject: `New message from ${name}`,
        text: message,
    }

    transporter.sendMail(mailOption, (error, info) =>{
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Message sent successfully!');
    })

})



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