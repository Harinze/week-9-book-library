import mongoose from 'mongoose';
 import dotenv from 'dotenv';
 dotenv.config({path: __dirname + '/.env'});
 dotenv.config()


export const connectionDb = async () => {
    try {
        if(process.env.DATABASE_URI === undefined)return 
        await mongoose.connect(process.env.DATABASE_URI, {
            })
    } 
    
    catch (err) {
        console.log(err)
    }
  //  console.log(process.env.DATABASE_URI)
}

export default connectionDb;

// const dotenv = require('dotenv'); 
// const mongoose = require("mongoose");



// dotenv.config({path: __dirname + '/.env'});

// const connectDB = async ()=>{
//     try{    
//         // if(process.env.DATABASE_URI === undefined) return;
//             await mongoose.connect("mongodb+srv://DECAlumProjectMembers:passwordforproject@cluster0.kgq8yp7.mongodb.net/?retryWrites=true&w=majority", {
//                 useUnifiedTopology: true,
//                 useNewUrlParser: true
//             });
//     }catch(error){
//         console.error(error);
//     }
// }
