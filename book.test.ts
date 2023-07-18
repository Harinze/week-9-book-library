import request from 'supertest';
import app from './src/app'; 
import { dbConnect, dbDisconnect } from './src/config/mongodbMemoryConnection';
import bookRoutes from './src/routes/bookRoutes'
import userRoutes from './src/routes/userRoutes'

// afterAll(async () => {

//     await dbDisconnect();
  
//   });

app.use('/books', bookRoutes)
app.use('/users', userRoutes)


    

        
      const signupInfo =  {
           
          firstName: "jerry",
          lastName: "olam",
           email:"olame@gmail.com",
           state:"Edo",
           country:"Togo",
           password:"12345"
           
         }
      
         const logInfo ={
           email:"olame@gmail.com",
           password:"12345",
      }
      
      describe('User Testing', () => { 
          it('/POST user signup', async () => {
              const user =  await request(app).post('/users/usersignup')
               .send(signupInfo)
      
              
               if( user.statusCode === 200){
                expect(user.body.message).toBe( `User profile has been created!`)
              
               }
          })
               
          it('/POST user login', async () => {
               const user =  await request(app).post('/users/login')
              .send(logInfo)
              if( user.statusCode === 200){
               expect(user.body.message).toBe('Login Successful')
               }
           })
             
            // Get all users
           it('/GET get all users', async () => {
              const user = await request(app).get('/users/getallusers')
              if(user.statusCode === 200){
                 expect(user.body.message).toBe("All Users successfully loaded!")
                  // infos:allUsers
             }
       })
         
          // Update user
          it('/PUT update users', async () => {
              const user = await request(app).put('/users/updateuser')
              if(user.statusCode === 200){
                 expect(user.body.message).toBe("User updated successfully")
                  // infos:allUsers
             }
       })
      
      
          //  Delete  user
         it('/delete users', async () => {
          const user = await request(app).delete('/users/deleteuser')
          if(user.statusCode === 200){
             expect(user.body.message).toBe("User deleted successfully")
              
         }
      })
      
     })
      
      
      describe('Book Testing', () => { 
           
          
          it('/POST create books',async () => {
             
      
              const books = {
                  "title": "Things fall apart from apart",
                  "author": "Chinua",
                  "datePublished": "January",
                  "description": "Novel by Chinua",
                  "pageCount": 267,
                  "genre": "Novel",
                   "publisher": "uuiu dec"
              }
      
              const bookResponse = (await request(app).post('/books/createbook').send(books)
              .set('authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFmMzQ2ZmQ3NDJjMjUxZTE4ZTlhMDUiLCJmaXJzdE5hbWUiOiJBbWFyYSIsImxhc3ROYW1lIjoib2Jpb3JhIiwiZW1haWwiOiJvYmlvcmFraW5nc2xleTI0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJE5KSk9jQ1VyT0hhbm5XdFUvaTVURU9oYzUydU5lai90RjA0UG93QThnVmwvYzFaMG9ERkVHIiwicm9sZSI6IkF1dG9yIiwiYm9va3MiOltdLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJfX3YiOjAsImlhdCI6MTY4OTI0Mjg3MiwiZXhwIjoxNjg5ODQ3NjcyfQ.rIp3lHfHym5Q2Ba6BF7ackPJUnJ3MrIi1eiSpubMJOY`) )
      
              if(bookResponse.statusCode === 200){
                  expect(bookResponse.body.message).toBe(`Book created successfully`)
              }
          })
      
           // GET ALL BOOKS
          it('/GET books', async () =>{
              const books = (await request(app).get('/books/getallbooks').set('authorization',
              `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFmMzQ2ZmQ3NDJjMjUxZTE4ZTlhMDUiLCJmaXJzdE5hbWUiOiJBbWFyYSIsImxhc3ROYW1lIjoib2Jpb3JhIiwiZW1haWwiOiJvYmlvcmFraW5nc2xleTI0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJE5KSk9jQ1VyT0hhbm5XdFUvaTVURU9oYzUydU5lai90RjA0UG93QThnVmwvYzFaMG9ERkVHIiwicm9sZSI6IkF1dG9yIiwiYm9va3MiOltdLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJfX3YiOjAsImlhdCI6MTY4OTI0Mjg3MiwiZXhwIjoxNjg5ODQ3NjcyfQ.rIp3lHfHym5Q2Ba6BF7ackPJUnJ3MrIi1eiSpubMJOY`))
               
              if(books.statusCode === 200){
                  expect(books.body.message).toBe("All Books successfully loaded!")
              }
          });
      
      
          it('/PUT update a book',async () => {
             
      
              const books = {
                  "title": "john890",
                  "author": "kingobiora",
                  "date_published": "11-10-11",
                  "description": "spain madrid",
                  "page_count": 707,
                  "genre": "poems",
                   "publisher": "decagon"
              }
      
              const bookUpdate = (await request(app).put('/books/updatebook').send(books)
              .set('authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFmMzQ2ZmQ3NDJjMjUxZTE4ZTlhMDUiLCJmaXJzdE5hbWUiOiJBbWFyYSIsImxhc3ROYW1lIjoib2Jpb3JhIiwiZW1haWwiOiJvYmlvcmFraW5nc2xleTI0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJE5KSk9jQ1VyT0hhbm5XdFUvaTVURU9oYzUydU5lai90RjA0UG93QThnVmwvYzFaMG9ERkVHIiwicm9sZSI6IkF1dG9yIiwiYm9va3MiOltdLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJfX3YiOjAsImlhdCI6MTY4OTI0Mjg3MiwiZXhwIjoxNjg5ODQ3NjcyfQ.rIp3lHfHym5Q2Ba6BF7ackPJUnJ3MrIi1eiSpubMJOY`) )
      
              if(bookUpdate.statusCode === 200){
                  expect(bookUpdate.body.message).toBe(`Book updated successfully`)
              }
           
          });
             
      
          // DELETE BOOK
          it('/DELETE DELETE BOOK',async () => {
              
      
              const books = {
                  "title": "Things fall apart102"
              }
      
              const bookDelete = (await request(app).delete('/books/deletebook').send(books)
              .set('authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFmMzQ2ZmQ3NDJjMjUxZTE4ZTlhMDUiLCJmaXJzdE5hbWUiOiJBbWFyYSIsImxhc3ROYW1lIjoib2Jpb3JhIiwiZW1haWwiOiJvYmlvcmFraW5nc2xleTI0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJE5KSk9jQ1VyT0hhbm5XdFUvaTVURU9oYzUydU5lai90RjA0UG93QThnVmwvYzFaMG9ERkVHIiwicm9sZSI6IkF1dG9yIiwiYm9va3MiOltdLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJfX3YiOjAsImlhdCI6MTY4OTI0Mjg3MiwiZXhwIjoxNjg5ODQ3NjcyfQ.rIp3lHfHym5Q2Ba6BF7ackPJUnJ3MrIi1eiSpubMJOY`) )
      
              if(bookDelete.statusCode === 200){
                  expect(bookDelete.body.message).toBe(`Book deleted successfully`)
              }
          })
      
      
          // GET SINGLE BOOK INFORMATION
      
          it('/GET GET SINGLE BOOK INFO',async () => {
              
      
              const books = {
                  "title": "john890"
              }
      
              const bookInfo = (await request(app).get('/books/getbook').send(books)
              .set('authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFmMzQ2ZmQ3NDJjMjUxZTE4ZTlhMDUiLCJmaXJzdE5hbWUiOiJBbWFyYSIsImxhc3ROYW1lIjoib2Jpb3JhIiwiZW1haWwiOiJvYmlvcmFraW5nc2xleTI0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJE5KSk9jQ1VyT0hhbm5XdFUvaTVURU9oYzUydU5lai90RjA0UG93QThnVmwvYzFaMG9ERkVHIiwicm9sZSI6IkF1dG9yIiwiYm9va3MiOltdLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA3LTEyVDIzOjE3OjAzLjM0OVoiLCJfX3YiOjAsImlhdCI6MTY4OTI0Mjg3MiwiZXhwIjoxNjg5ODQ3NjcyfQ.rIp3lHfHym5Q2Ba6BF7ackPJUnJ3MrIi1eiSpubMJOY`) )
      
              if(bookInfo.statusCode === 200){
                  expect(bookInfo.body.message).toBe(`A Book successfully loaded!`)
              }
          })
        })