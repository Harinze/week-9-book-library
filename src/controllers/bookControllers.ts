import express, {Request, Response, NextFunction } from 'express';
import z from 'zod'

import Book from '../model/books';
import bcrypt from "bcrypt";

  

interface BookInterface {
   _id: string; 
    title: string;
    author: string;
    datePublished: string;
    pageCount:  Number;
    description: string;
    genre: string;
    publisher: string;
    
}


  const addBookSchema = z.object({
    title: z.string({
      required_error: "Enter the title"
    }),
    author: z.string({
        required_error: "Enter the authors name"
      }),
      description:  z.string({
        required_error: "No description specified"
      }),
      genre:  z.string({
        required_error: "Enter gerne"
      }),
      datePublished:  z.string({
        required_error: "input date published"
      }),
      pageCount:  z.number({
        required_error: "input number of pages"
      }),
  });
  
 
     // ====   ADD BOOK == //
  
  export const bookCreation = async (req:Request, res:Response, Next:NextFunction)=>{
  
      req.on('error', (error)=>{
      res.status(500).send(error);
      })
  
      try{


        const {title, author, pageCount, description, datePublished, genre, publisher} = req.body;
          
         const checkDuplicateTitle = await Book.findOne({title})

         let newUser: BookInterface = req.body;

         const error = addBookSchema.safeParse(newUser);
         if (error.success === false) {
           res.status(400).send({
             error: error.error.issues[0].message
           });
           return;
         }

         
         
          if(checkDuplicateTitle){
              return res.send({
                  message: `Book already exists!`
              })
          }
          
          if(!checkDuplicateTitle){
            const  book =  await Book.create({
              title,
              author,
              datePublished,
              description,
              pageCount,
             genre,
             publisher,
      });
  
   //const book = await createBook.save()

return res.status(200).json({
  method: req.method,
  message: `Book created successfully`,
  book
})
          }

            }catch(err){
              return res.status(500).json({
                message: `Internal Server Error`,
                Error: '/users/create'
            })
       }
      
      }
        
    // == GET ALL BOOKS == //
  
    export const getAllBooks =  async (req:Request, res:Response, Next:NextFunction)=>{
     
       try{
        const book = await Book.find();
      if(!book) return res.status(204).json({message: "No book was found!"})
      if(book){
      return res.status(200).json({
        method: req.method,
        message: `All Books successfully loaded!`,
        book
     })
    }
       }catch(err){
        return res.status(500).json({
          message: `Internal Server Error`,
          Error: '/books/getallbooks'
      })
      }
     
   }
  
      // === GET A BOOK ====//
    
      export const getEachBook = async (req:Request, res:Response, Next:NextFunction)=>{
       
         try{

          const { title}= req.body
          const book = await Book.findOne({title});
         // const bookAuthor = await Book.findOne(author)

  
        if(!book){
          return res.status(204).json({
            message: `ID does not match.`
          })
        }
          else{
              return res.status(200).json({
              method: req.method,
              message: `A Book successfully loaded!`,
              book
     })
     }
         }catch(err){
          console.log(err)}
        
       }
    
                       // UPDATE A BOOK
    
      export const updateBookFunction = async (req:Request, res:Response, Next:NextFunction)=>{
       
       
    
        try{

          
  
          let newUser: BookInterface = req.body;
  
          const error = addBookSchema.safeParse(newUser);
          if (error.success === false) {
            res.status(400).send({
              error: error.error.issues[0].message
            });
            return;
          }

          const {title} = req.body
          const book = await Book.findOne({title});
  
        if(!book){
            return res.status(401).json({
              message: `Title does not match.`
            })
          }
          
        if(book) {
          if(req.body?.author) book.author = req.body.author;
          if(req.body?.pageCount) book.pageCount = req.body.pageCount;
          if(req.body?.description) book.description = req.body.description;
          if(req.body?.datePublished) book.datePublished = req.body.datePublished;
          if(req.body?.publisher) book.publisher = req.body.publisher;
        }
         // const updatedBook = await book.save()
    
          res.status(200).json({
            success:true,
            method:req.method,
            message: 'Book updated successfully',
            book
        })

        }catch(err){
          return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/books/updatebook'
        })
        }
       
  
    }
      
          // === DELETE BOOK === //
  
    export const deleteBooks = async (req:Request, res:Response, Next:NextFunction)=>{
    
  
      
      try{

        const {title} = req.body
        const book = await Book.findOneAndDelete({title})
        if(!book){
          return res.status(404).json({
            message: `No book title matches this title`
          })
        }
            if(book){
             
              return res.status(200).json({
                message: `Book Deleted successfully`,
              book
            })
            }
       
         
      }catch(err){
        return res.status(500).json({
          message: `Internal Server Error`,
          Error: '/books/deletebook'
      })
      
      }
      
    
 }

 export const getPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = 1;
    if(req.query.page){
      page = parseInt(req.query.page as string)
    if (Number.isNaN(page)) {
     return res.status(400).json({
            message: 'Invalid page number'
    })
  }
    }
    

    const pageSize = 5;
    const skip = (page - 1) * pageSize;

    const totalCount = await Book.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);

    const books = await Book.find().skip(skip).limit(pageSize);

    return res.status(200).json({
      books,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
  
