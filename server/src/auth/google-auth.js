import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import GoogleUser from "../mongoDB/GoogleUser.js";
import dotenv from "dotenv";
dotenv.config()


passport.use(new Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/redirect"
}, async (accessToken, refreshToken, profile, done) => {
  try{
    const exist = await GoogleUser.findOne({ authID: profile.id})
    if (exist) {
      done(null, exist)
    } else {
    const newUser = await new GoogleUser({
      username: profile.displayName,
      email: profile.emails[0].value,
      authID: profile.id,
      provider: profile.provider,
      profilePicture: profile.photos[0].value,
      level: 0
    }).save()
    done(null, newUser)
    }
  } catch (e) {
    console.error(e.message)
    done(e,null)
  }
}))