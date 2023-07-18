// import mongoose, {ConnectOptions} from "mongoose";
// import  { MongoMemoryServer } from "mongodb-memory-server"


// let mongo = null as  unknown as any
 
// export const connectDB = async () => {
//   mongo = await MongoMemoryServer.create(); // initialize mongo-memory-server
//   const uri = mongo.getUri(); //generate uri function

//   console.log('uri', uri)
 
//   await mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   } as ConnectOptions);
// };

// export const dropDB = async () => {
//     if (mongo) {
//       await mongoose.connection.dropDatabase();
//       await mongoose.connection.close();
//       await mongo.stop();
//     }
//   };

//  export  const dropCollections = async () => {
//     if (mongo) {
//       const collections = await mongoose.connection.db.collections();
//       if(collections.length > 1){
//         for (let collection of collections) {
//           await collection.drop();
//         }
//       }
     
//     }
//   };

