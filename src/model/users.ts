import mongoose from 'mongoose'


const Schema = mongoose.Schema;

const userSchema =  new Schema({
   
    email: {
        type: String,
        required: true 
    },

    // roles: {
    //     user: {
    //         type: Number,
    //         default: 1000
    //     },
    //     Editor: Number,
    //     Admin: Number
     //},

    password: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
         
  country:{
    type: String,
    required: true
}

    

  //  refreshToken: String
},
    {
    timestamps:true})

 const User = mongoose.model('User', userSchema)

 export default User;