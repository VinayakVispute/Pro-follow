import mongoose, { Types, Model } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      unique: [true, "Clerk ID should be Unique"],
      required: [true, "Clerk ID is required"],
    },
    email: {
      type: String,
      unique: [true, "Email address is required"],
      required: [true, "Email address should be unique"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    profileImageUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dkawvablj/image/upload/v1735590810/ProFollow/eizlfxie8tvgsou1bspw.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
