import express from 'express'
import mongoose from 'mongoose'
import Message from './Schemas/dbMessages.js'
import Pusher from 'pusher'

const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1441999",
    key: "f668ce0438a8322f5f1a",
    secret: "01656c6ee7dcbc721fde",
    cluster: "ap2",
    useTLS: true
  });
  


  pusher.trigger("my-channel", "my-event", {
    message: "hello world"
});
  
const db = mongoose.connection

db.once('open',()=>{
    console.log("Connected")
    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()

    changeStream.on('change',(change)=>{
        console.log(change)
    })
})


// Middle ware
app.use(express.json())


// DB Configs
// const dburl = 'mongodb+srv://JustChatIt:U6GPcaXLcCCUwyAy@cluster0.xypklem.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const dburl = 'mongodb://JustChatIt:U6GPcaXLcCCUwyAy@ac-pleczyg-shard-00-00.xypklem.mongodb.net:27017,ac-pleczyg-shard-00-01.xypklem.mongodb.net:27017,ac-pleczyg-shard-00-02.xypklem.mongodb.net:27017/?ssl=true&replicaSet=atlas-lukhn1-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(dburl, {
    // useCreateIndex : true,
    useNewUrlParser:true,
    useUnifiedTopology: true
},()=>{
    console.log("DB Connected");
})

// APIS
app.get('/',(req,res)=>res.status(200).send('hello'))

app.post('/messages/new', (req,res) => {
    const dbMessage = req.body
    // console.log(req.body)
    // console.log(dbMessage)
    try{
        Message.create(dbMessage, (err, data) =>{
            if(err){
                console.log(err);
                res.status(500).send(err)
            }
            else{
                res.status(201).send(data)
            }
        })
    }
    catch(e){
        console.log(e);
        res.status(500).send(e)
    }
})
app.get('/messages/sync', (req,res) => {
    try{
        Message.find( (err, data) =>{
            if(err){
                console.log(err);
                res.status(500).send(err)
            }
            else{
                res.status(200).send(data)
            }
        })
    }
    catch(e){
        console.log(e);
        res.status(500).send(e)
    }
})



app.listen(port , ()=>console.log("running on " + port))