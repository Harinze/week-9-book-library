import express, {Request, Response, NextFunction} from 'express';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import z from 'zod';
import User from '../model/users'





interface userSignUp {
  
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  state: string;
}


export const userSignUpSchema = z.object({
  firstName: z.string({
    required_error: "input first Name"
  }),

  lastName: z.string({
    required_error: "input Last Name"
  }), 

  country: z.string({
    required_error: "What country are you ?"
  }),

  state: z.string({
    required_error: "what state are you"
  }),

  email: z.string({
    required_error: "valid email is required"
  }).email(),
  password: z.string({
    required_error: "input password"
  })
});
    

    interface user {
      email: string;
      password: string;
    }

  
     const userLoginSchema = z.object({
      email: z.string({
        required_error: "valid email required"
      }).email(),
      password: z.string({
        required_error: "input password"
      })
  });
  
  
  export const userCreation = async(req:Request, res:Response, next:NextFunction) => {
      try{
           
        let newUser: userSignUp = req.body;

    const error = userSignUpSchema.safeParse(newUser);
    
    if (error.success === false) {
      res.status(400).send({
        error: error.error.issues[0].message
      });
      return;
    }
  
        const {email,password,country,state,firstName,lastName} = req.body;
             
         const checkDuplicateUser = await User.findOne({email})
         
        
          if(checkDuplicateUser){
              return res.status(400).send({
                  message: `User already exists`
              })
          }
      
         const saltHassLength = 10;
         const salt = await bcrypt.genSalt(saltHassLength);
         const hass = await bcrypt.hash(password,salt);
         if(!checkDuplicateUser){
          const user =  await User.create({
          
            email,
            password:hass,
            firstName,
            lastName,
            state,
            country,
         
           });
           const createdUser = await user.save()

           return res.status(200).send({
            method: req.method,
            message: `User profile has been created!`,
            createdUser
           })
         }
        
            }catch(err){
              return res.status(500).json({
                message: `Internal Server Error`,
                Error: '/users/create'
            })
       }
  }
  
  export const login = async(req:Request, res:Response, next:NextFunction)=>{
      try{
  
        let newUser: user = req.body;

        const error = userLoginSchema.safeParse(newUser);
        if (error.success === false) {
          res.status(400).send({
            error: error.error.issues[0].message
          });
          return;
        }
       
   const {email,password} = req.body;
  
      const user = await User.findOne({email})
        if(!user){
          return res.json({
            message: `User not found!`
          })
        }
        
    if(user){
         const validate = await bcrypt.compare(password, user.password)
          if(validate){
              const token = jwt.sign(user.toObject(), 'process.env.APP_SECRET', {
                expiresIn: 604800 
              })
              return res.status(200).json({
                  method: req.method,
                  message: `Login Successful`,
                  token
              })
            }
          }else{
              return res.send({
                  message: `Invalid details`
              })
          
      }
  
  
      }catch(err){
        return res.status(500).json({
          message: `Internal Server Error`,
          Error: '/users/login'
      })
      }
  }



export const updateUsers = async (req:Request, res:Response, next:NextFunction) => {

  try{

    const email = req.body
    const user = await User.findOne({email});
 
    let newUser: userSignUp = req.body;

    const error = userSignUpSchema.safeParse(newUser);
    if (error.success === false) {
      res.status(400).send({
        error: error.error.issues[0].message
      });
      return;
    }

    if(!user){
      return res.status(204).json({
        message: `ID does not match.`
      })
    }
    
  if(user) {
   // if(req.body?.email) user.email = req.body.email;
    if(req.body?.password) user.password = req.body.password;
    if(req.body?.lastName) user.lastName = req.body.lastName;
    if(req.body?.firstName) user.firstName = req.body.firstName;
    if(req.body?.state) user.state = req.body.state;
    if(req.body?.country) user.country = req.body.country;
  }
    const updatedUser = await user.save()

    res.status(200).json({
      success:true,
      method:req.method,
      message: 'User updated successfully',
      updatedUser
  })

  }
  catch(err){
    return res.status(500).json({
      message: `Internal Server Error`,
      Error: '/users/userupdate'
  })
  }
}

export const deleteUser = async (req:Request, res:Response, Next:NextFunction)=>{
    
 
    try {

      const email = req.body
      const user = await User.findOne({email});
      
      if(!user){
        return res.status(204).json({
          message: `No user ID matches the ID that you provided.`
        })
      }
     
      if(user){
        const deletedUser = await User.findOneAndDelete({user})
        return res.status(200).json({
          message: `Deleted successfully`,
        deletedUser
      })
      }
     

    } catch(err){
      return res.status(500).json({
        message: `Internal Server Error`,
        Error: '/users/deleteuser'
    })
    }
 
}

export const getEachUser = async (req:Request, res:Response, Next:NextFunction)=>{
  req.on('error', (error)=>{
    res.status(500).send(error);
  })
    try
       
    {
      const email = req.body
      const user = await User.findOne({email});
    
      if(!user){
        return res.status(204).json({
          message: `ID does not match.`
        })
      }
    else{
     return res.json({
      status: 'success',
      method: req.method,
      message: `A User successfully loaded!`,
      user
    })
    }
    }
      catch(err){
        return res.status(500).json({
          message: `Internal Server Error`,
          Error: '/users/eachuser'
      })
      }
 
 }

 export const getAllUsers =  async (req:Request, res:Response, Next:NextFunction)=>{
  req.on('error', (error)=>{
    res.status(500).send(error);
  })
  try{
    const users = await User.find();
    if(!users) return res.status(204).json({message: "No user was found!"})
    if(users){
    return res.json({
      status: 'success',
      method: req.method,
      message: `All Users successfully loaded!`,
      users
   })
  }
  }
    catch(err){
      return res.status(500).json({
        message: `Internal Server Error`,
        Error: '/users/allusers'
    })
    }
}






