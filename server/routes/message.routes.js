import { Router } from "express";
const app = Router();
import { CreateMessageRoute,GetAllMessageRoute } from "../services/message.services.js";

// get requests
// app.get('/getAll',(req,res)=>CreateMessage(req,res))
app.get('/message/:id',(req,res)=>GetAllMessageRoute(req,res))

// post requests
app.post("/message/create-new", (req, res) => CreateMessageRoute(req, res));

export default app;
