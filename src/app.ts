
import createError,{HttpError} from "http-errors";
import express, {Request, Response, NextFunction} from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import {dbConnect} from "./config/mongodbMemoryConnection"
import mongoose from "mongoose";
import {connectionDb} from "./config/dbconfig"
dotenv.config()
connectionDb()


if(process.env.NODE_ENV === "test"){
  dbConnect()
}else{connectionDb}






const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/books', bookRoutes)




// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});

// error handler
app.use((err:HttpError, req:Request, res:Response, next:NextFunction):any => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connection.once('open', ()=>{

  console.log("database connected");
  app.listen(process.env.PORT || 6000, ()=>{
    console.log("Server is on")
})
//console.log(process.env.DATABASE_URI)
})



export default app;


// frontend - app.ts - routes - controller
