import express from 'express'
import Dotenv from 'dotenv'
import Pusher from "pusher";
Dotenv.config()



export const pusher = new Pusher({
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_KEY,
    secret:process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
});

import ConnectDatabase from "./db/index.js"
import {MessageRoute} from "./routes/index.js"

ConnectDatabase()
const app = express()
const port = process.env.PORT || 9000

app.use(express.json())

// routes
app.use(MessageRoute)


app.listen(port , ()=>console.log("running on " + port))