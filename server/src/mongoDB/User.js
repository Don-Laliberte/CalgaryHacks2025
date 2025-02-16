//create user Schema
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: false,
  },
  hash: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: false,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  provider: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: false,
  },
  level: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: false,  
  }
});

const User = mongoose.model("User", userSchema);
export default User;
