import express from "express";
import Dotenv from "dotenv";
import Pusher from "pusher";
import cors from 'cors'
Dotenv.config();


export const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

import ConnectDatabase from "./db/index.js";
import { ChatRoute, MessageRoute } from "./routes/index.js";
import { ErrorResponse } from "./Utills/Responces.js";

ConnectDatabase();
const app = express();
const port = process.env.PORT || 8000;

var corsOptions = {
  origin: ["https://just-chat-it.web.app","http://localhost:3000","https://3000-itsrajatkuma-justchatit-7ne62q3cvdt.ws-us83.gitpod.io"],
  optionsSuccessStatus: 200 // For legacy browser support
}
  
app.use(cors(corsOptions));

app.use(express.json());

// routes
app.use(MessageRoute);
app.use(ChatRoute);


app.all("/*", (req, res) => {
  return ErrorResponse(res, 404, "Route not found");
});

app.listen(port, () => console.log("running on " + port));
