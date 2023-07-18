import mongoose from 'mongoose'
import { date } from 'zod';


const Schema = mongoose.Schema;

const bookSchema = new Schema({
    
    title : {
        type: String,
        required: true
    },
    author : {
        type: String,
        required: true
    },
    pageCount : {
        type: Number,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    publisher : {
        type: String,
        required: false
    },
    datePublished : {
        type: String,
        required: true,
        },
        genre : {
            type: String,
            required: true,
            }
   
},{
    timestamps:true})



 
export default mongoose.model('Book', bookSchema)
