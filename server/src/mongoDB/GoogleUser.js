import mongoose from "mongoose";

const GoogleUserSchema = {
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: false,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  authID: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  provider: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: false,
  },
  profilePicture: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: false,
  },
  level: {
    type: mongoose.Schema.Types.Int32,
    required: true,
    unique: false,    
  }
};

const GoogleUser = mongoose.model("GoogleUser", GoogleUserSchema);

export default GoogleUser;
