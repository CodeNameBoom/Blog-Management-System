import mongoose from "mongoose";


 const Connection =async(USERNAME,PASSWORD)=> { //username , password are not meant to be disclosed !
    const URL =`mongodb://${USERNAME}:${PASSWORD}@ac-6rzvsjf-shard-00-00.9kzbkwf.mongodb.net:27017,ac-6rzvsjf-shard-00-01.9kzbkwf.mongodb.net:27017,ac-6rzvsjf-shard-00-02.9kzbkwf.mongodb.net:27017/?ssl=true&replicaSet=atlas-payyus-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-web`;
    try{
        await mongoose.connect(URL);
        console.log("Database connected successfully!"); //if database connected
    }catch (error){
       console.log("Error while connecting with database",error);//if not then
    }
    

}
export default Connection;