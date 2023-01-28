import MessageModel from "../Schemas/dbMessages.js"
import mongoose from "mongoose";
export const CreateMessage = async (data)=>{
    try {
        const created = await MessageModel.create(data);
        return {status:true,data:created}
    } catch (err) {
        console.log(err)
        return {status:false,data:err}
    }
}
export const GetMessagebyChatID = async (id,page)=>{
    const newid = mongoose.Types.ObjectId(id.trim());
    try {
        const findData = await MessageModel.find({chat_id:newid}).sort({updatedAt:-1}).skip(page*100).limit(100);
        return {status:true,data:findData.reverse()}
    } catch (err) {
        console.log(err)
        return {status:false,data:err}
    }
}
