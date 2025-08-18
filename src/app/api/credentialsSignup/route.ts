import { dbConnect } from "@/lib/dbConnect";
import { usermodel } from "@/models/user.model";
import { NextRequest } from "next/server";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { username, email, password } = await req.json();
    const isExisted = await usermodel.findOne({ email: email });
    if (isExisted) {
      return Response.json(
        { success: false, message: "user already with these credentials" },
        { status: 409 }
      );
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const verification_code = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const verificationCodeExpiry = new Date(Date.now() + 3600000);
     await usermodel.create({
      username,
      email,
      ismember: false,
      password: hashPassword,
      isverified: false,
      verifyCodeExpiry:verificationCodeExpiry,
      verfificationCode:verification_code,
      signUptype:'credential'
    });
    
      if (typeof email == "string" && typeof username == "string"){
          const response=await sendVerificationEmail(email, username, verification_code);
          console.log(response)
        }
      return Response.json(
        { message: "User created successfully", sucess: true },
        { status: 200 }
      );
    
  } catch (error) {
    console.log("something went wrong while signingup", error);
    return Response.json(
      { success: false, message: "something went wrong while signing up " },
      { status: 500 }
    );
  }
}
