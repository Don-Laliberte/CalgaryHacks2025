import GoogleUser from "../mongoDB/GoogleUser.js";
import { Router } from "express";
import { validateAuth } from "../controller/validateAuth.js";

const router = Router()

router.get("/update", validateAuth, async (req, res) => {
  //add the user finished thing 1-3
  //const foundUser = GoogleUser.findOneAndUpdate({id: req.user.id, })
})
export default router