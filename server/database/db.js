import mongoose from "mongoose";


 const Connection =async(USERNAME,PASSWORD)=> { //username , password are not meant to be disclosed !
    const URL =`mongodb+srv://${USERNAME}:${PASSWORD}@blog-web.63lam.mongodb.net/?retryWrites=true&w=majority&appName=blog-web`;
    try{
        await mongoose.connect(URL);
        console.log("Database connected successfully"); //if database connected
    }catch (error){
       console.log("Error while connecting with database",error);//if not then
    }
    

}
export default Connection;