import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
}, { timestamps: true });



userSchema.pre("save", async function (next) {
  const user = this;
  if(!user.isModified("password"))
    return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();    
  } 
  catch (error) {
    return next(error);
  }  
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
  } catch (error) {
    throw(error);
  }
}
// {
//   "_id": "64f1b0e2c123456789abcd01",
//   "name": "John Doe",
//   "email": "john@example.com",
//   "password": "$2a$10$XyzHashedPasswordHere",
//   "role": "student",
//   "createdAt": "2025-08-24T12:00:00.000Z",
//   "updatedAt": "2025-08-24T12:00:00.000Z"
// }
const User = mongoose.model("User", userSchema);
export default User;
