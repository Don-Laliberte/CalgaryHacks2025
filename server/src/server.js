import dotenv from "dotenv";
import { connectMongo } from "./mongoDB/connectMongo.js";
import express from "express";
import http from "node:http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import authRoute from "./routes/auth.js"
import updateUser from "./routes/updateUser.js"
import checkAuth from "./routes/checkAuth.js"
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
app.use(passport.initialize());
app.use(passport.session());

//routes bud
app.use("/auth", authRoute)
app.use("/api", checkAuth)
app.use(updateUser)


const server = http.createServer(app);

connectMongo();

server.listen(process.env.PORT, () => {
  console.log(`listening on PORT: ${process.env.PORT}`);
});
