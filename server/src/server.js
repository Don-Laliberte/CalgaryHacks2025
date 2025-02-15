import dotenv from "dotenv";
import { connectMongo } from "./mongoDB/connectMongo.js";
import express from "express";
import http from "node:http"
dotenv.config();

const app = express()

const server = http.createServer(app)

connectMongo()

server.listen(process.env.PORT, () => {
  console.log(`listening on PORT: ${process.env.PORT}`)
})