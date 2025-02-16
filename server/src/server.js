import dotenv from "dotenv";
import { connectMongo } from "./mongoDB/connectMongo.js";
import express from "express";
import http from "node:http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
  },
}))

const server = http.createServer(app);

connectMongo();

server.listen(process.env.PORT, () => {
  console.log(`listening on PORT: ${process.env.PORT}`);
});
