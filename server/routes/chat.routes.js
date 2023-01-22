import {Router} from 'express'
const app = Router();
import { CreateChatRoute,GetAllChatRoute } from '../services/chat.services.js'

// get requests
// app.get('/getAll',(req,res)=>CreateMessage(req,res))
app.get('/chat/:id',(req,res)=>GetAllChatRoute(req,res))

// post requests
app.post('/chat/create-new',(req,res)=>CreateChatRoute(req,res))

export default app;