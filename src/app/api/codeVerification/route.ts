import { dbConnect } from "@/lib/dbConnect";
import { usermodel } from "@/models/user.model";



export async function POST(req:Request){
    await dbConnect()
    try {
        const {verifyCode,email}=await req.json()
        const isExisted=await usermodel.findOne({email})
         if(!isExisted){
            return Response.json({success:false,message:"No user exists with this email"},{status:404})
        }
        const isCodeCorrect=verifyCode===isExisted.verfificationCode
        const isCodeNotExpired=new Date<new Date(isExisted.verifyCodeExpiry)
        if(isCodeCorrect&&isCodeNotExpired){
            return Response.json({success:true,message:"User email is verifed"},{status:200})
        }
        else if(!isCodeCorrect){
            return Response.json({success:false,message:"Code is not correct"},{status:200})
        }
        else if(!isCodeNotExpired){
            return Response.json({success:false,message:"Code is Expired"},{status:200})
        }
        
    } catch (error) {
        console.log("Something went wrong while verifying the code",error)
        return Response.json({success:false,message:"Code is Expired"},{status:200})
    }
}