import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const {MONGO_URI} = process.env;
        if(!MONGO_URI) throw new Error("MONGO_URI is not set");
      const conn= await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB CONNECTED :" , conn.connection.host)
    } catch (error) {
        console.error("Error Connection to mongoDB:" , error)
        process.exit(1); //1 status code means fails,0 means success

    }
}