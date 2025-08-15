import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  ismember: boolean;
  password: string;
  signUptype:string;
  isverified: boolean;
  verfificationCode: number;
  verifyCodeExpiry: Date;
  forgotPassword_otp: string;
  forgotPassword_otp_Expiry: Date;
}

export const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String
  },
  ismember: {
    type: Boolean,
    default: false,
  },
  signUptype:{
    type:String,
    required:true,
    enum:['Oauth','credential']
  }
  ,
  isverified: {
    type: Boolean,
    default: false,
  },
  verfificationCode: {
    type: Number,
  },
  verifyCodeExpiry: {
    type: Date,
  },
  forgotPassword_otp: String,
  forgotPassword_otp_Expiry: Date,
});

export const usermodel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);
