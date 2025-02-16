import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import GoogleUser from "../mongoDB/GoogleUser";

passport.use(new Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
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
      profilePicture: profile.photos[0].value
    }).save()
    done(null, newUser)
    }
  } catch (e) {
    console.error(e.message)
    done(e,null)
  }
}))