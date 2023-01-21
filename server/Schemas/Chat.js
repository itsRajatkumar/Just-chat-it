import mongoose from "mongoose";

const ChatSchema = mongoose.Schema({
    chatid_Name : String,
    users : String
})

export default mongoose.model('chat', ChatSchema);