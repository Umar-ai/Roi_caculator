import VerificationEmail from "../../emails/verificationEmailTemplate";
import { resend } from "@/lib/resend";
export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
){
  try {
    const response=await resend.emails.send({
      from: "no-reply@jadoon.xyz",
      to: email,
      subject: "Mystery Message Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: response };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
}
