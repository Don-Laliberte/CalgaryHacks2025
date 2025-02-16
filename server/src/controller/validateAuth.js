export const validateAuth = (req, res, next) => {
  try{
    if(!req.user)throw new Error("unvalidated user trying to log in")
    next()
  } catch(e){
    return res.send("invalid results")
    console.error(e.message)
  }
}