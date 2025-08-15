import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { usermodel } from "@/models/user.model";
import { dbConnect } from "@/lib/dbConnect";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      await dbConnect();
      if (!profile?.email) {
        throw new Error("email is required for further process");
      }
      const isUserExist = await usermodel.findOne({ email: profile?.email });
      if (isUserExist) {
        await usermodel.findOneAndUpdate(
          { email: profile?.email },
          { username: profile?.name }
        );
      } else {
        const user = await usermodel.create({
          username: profile?.name,
          email: profile?.email,
          signUptype:'Oauth',
          isverified:true
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as Get, handler as POST };
