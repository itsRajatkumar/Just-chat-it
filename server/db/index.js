import mongoose from 'mongoose'

const ConnectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        // useCreateIndex : true,
        useNewUrlParser:true,
        useUnifiedTopology: true
    }).then(res=>{
        console.log("connected DB")
    }).catch(err=>{
        console.log(err)
    })
}

export default ConnectDatabase