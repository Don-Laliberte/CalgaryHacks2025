import { Router } from "express";
import { validateAuth } from "../controller/validateAuth.js";
const router = Router();

router.get("/checkAuth", validateAuth,(req, res) => {
  return res.send({
    isLoggedIn: true,
    username: req.user.username,
    profilePicture: req.user.profilePicture,
    level: req.user.level
  })
})

export default router