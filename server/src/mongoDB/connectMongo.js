import mongoose, { mongo } from "mongoose"
export const connectMongo = async() => {
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`connected to database: ${process.env.MONGO_URI}`)
  } catch (e) {
    console.error(e)
  }
}