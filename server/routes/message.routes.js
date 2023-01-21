import express from 'express'
import { CreateMessage } from '../services/message.services.js'
const app = express()

// get requests
// app.get('/getAll',(req,res)=>CreateMessage(req,res))
app.get('/getAfter/:id',(req,res)=>res.status(200).send('hello'))

// post requests
app.post('/create-new',(req,res)=>CreateMessage(req,res))

export default app;