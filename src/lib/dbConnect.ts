import mongoose from "mongoose";

type connected={
    isconnected?:number
}
const Connection:connected={}
export const dbConnect=async()=>{
    try {
        if(Connection.isconnected){
            console.log("database is already connected")
            return 
        }
        else{
            const connection=await mongoose.connect(process.env.MONGODB_URI||"")
            Connection.isconnected=connection.connections[0]?.readyState
        }
        
    } catch (error) {
        console.log("something went wrong while connecting to database",error)
        return Response.json({success:false,message:"something went wrong while connecting to database"})
    }
}