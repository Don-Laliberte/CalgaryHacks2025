import { Router } from "express";
import { validateAuth } from "../controller/validateAuth.js";
import GoogleUser from "../mongoDB/GoogleUser.js";
const router = Router();

router.get("/leaderboard", validateAuth, async (req, res) => {
  try {
    const users = await GoogleUser.find({}).select(
      "-password -_id -provider -authID -email"
    );
    console.log(users);
    res.send(users);
  } catch (err) {
    console.error(err.message);
    res.send("there was an error");
  }
});

export default router;
