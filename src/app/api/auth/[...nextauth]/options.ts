import NextAuth, { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import { usermodel } from "@/models/user.model";
import CredentialsProvider  from "next-auth/providers/credentials";

import { dbConnect } from "@/lib/dbConnect";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge:60*60
    // maxAge: 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await usermodel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error('No user found with this email');
          }
          if (!user.isverified) {
            throw new Error('Please verify your account before logging in');
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
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
    async jwt({ token, user,account }) {
      if (user) {
        console.log("Access token expiry",account?.expires_at)
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
// const handler = NextAuth(authOptions);
// export { handler as Get, handler as POST };
