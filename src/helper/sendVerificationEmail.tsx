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

// import axios from "axios";
// import dns from "dns";

// export async function sendVerificationEmail(
//   email: string,
//   username: string,
//   verifyCode: string
// ) {
//   const url = "https://api.resend.com/emails";

// dns.setDefaultResultOrder("ipv4first");
//   const payload = {
//     from: "no-reply@jadoon.xyz",
//     to: email,
//     subject: "Mystery Message Verification Code",
//     html: `<p>Hello ${username}, your code is: <b>${verifyCode}</b></p>`,
//   };

//   const headers = {
//     Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
//     "Content-Type": "application/json",
//   };

//   // Log request details
//   console.log("📨 Request URL:", url);
//   console.log("📨 Request Headers:", headers);
//   console.log("📨 Request Body:", JSON.stringify(payload, null, 2));

//   try {
//     const response = await axios.post(url, payload, { headers });
//     console.log("📩 Resend response:", response.data);

//     return { success: true, message: response.data };
//   } catch (error: any) {
//     if (error.response) {
//       // Server responded but with error status
//       console.error("❌ Response error:", error.response.data);
//     } else if (error.request) {
//       // No response received
//       console.error("❌ No response received:", error.request);
//     } else {
//       // Something went wrong before the request
//       console.error("❌ Error setting up request:", error.message);
//     }

//     return { success: false, message: "Failed to send verification email." };
//   }
// }
