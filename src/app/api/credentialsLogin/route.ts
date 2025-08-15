import { usermodel } from "@/models/user.model";
import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";


export async function POST(req:Request){
    await dbConnect()
    try {
        const {email,password}=await req.json()
        const isExisted=await usermodel.findOne({email})
        if(!isExisted){
            return Response.json({success:false,message:"No user exists with this email"},{status:404})
        }
        if(isExisted.signUptype=='Oauth'){
            return Response.json({success:false,message:"You cannot use credentials login"},{status:401})
        }
        const isPasswordCorrect=await bcrypt.compare(password,isExisted.password)
        if(!isPasswordCorrect){
            return Response.json({success:false,message:"Entered Password is incorrect"},{status:401})
        }
        return Response.json({success:false,message:"User login successfully"},{status:200})
    } catch (error) {
        console.log("something went wrone while loggingup",error)
        return Response.json({success:false,message:"something went wrone while loggingup"},{status:500})

    }
}