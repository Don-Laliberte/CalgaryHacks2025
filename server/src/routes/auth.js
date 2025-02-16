import { Router } from "express";
import passport from "passport";
import "../auth/google-auth.js"
import GoogleUser from "../mongoDB/GoogleUser.js";

const router = Router()

passport.serializeUser((profile, done) => {
  console.log("here at ser")
  done(null, {id: profile.id, provider: profile.provider})
})

passport.deserializeUser(async (data, done) => {
  
  console.log("here at des")
  try{
    if(data.provider === "google"){
      console.log()
      const foundUser = await GoogleUser.findById(data.id)
      
      if (!foundUser) throw new Error("no user found")

      
      done(null, {
        username: foundUser.username,
        profilePicture: foundUser.profilePicture,
        id: foundUser.id
      })
    }
  } catch (err) {
    console.log("error deserializing")
    done(err, null)
  }
})

router.get("/google", passport.authenticate("google", { scope: ['profile', 'email'] }))
router.get("/google/redirect", passport.authenticate('google', { failureRedirect: 'http:localhost:5173/' }), (req, res) => {
  res.redirect("http://localhost:5173/")
})

export default router