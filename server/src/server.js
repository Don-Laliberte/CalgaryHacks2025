import dotenv from "dotenv";
import { connectMongo } from "./mongoDB/connectMongo.js";
import express from "express";
import http from "node:http";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
app.use(bodyParser.json());


const server = http.createServer(app);

connectMongo();

server.listen(process.env.PORT, () => {
  console.log(`listening on PORT: ${process.env.PORT}`);
});
