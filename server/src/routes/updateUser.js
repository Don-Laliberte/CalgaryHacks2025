import GoogleUser from "../mongoDB/GoogleUser.js";
import { Router } from "express";
import { validateAuth } from "../controller/validateAuth.js";

const router = Router()

router.get("/update", validateAuth, async (req, res) => {
  try {
    console.log("update", req.user.id)

    const updatedUser = await GoogleUser.findOneAndUpdate(
      { _id: req.user.id },
      { $inc: { level: 1 } },  
      { new: true }  
    );
    if (!updatedUser) {
      throw new Error("why is this not working")
    }
    console.log(updatedUser);
    res.send("updatedUser")
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Err");
  }
})
export default router