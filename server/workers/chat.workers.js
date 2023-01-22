import ChatModel from "../Schemas/Chat.js"

export const CreateChat = async (data)=>{
    try {
        const created = await ChatModel.create(data);
        return {status:true,data:created}
    } catch (err) {
        console.log(err)
        return {status:false,data:err}
    }
}


export const GetChatByUserID = async (id)=>{
    try {
        const findData = await ChatModel.find({members: {$elemMatch: {uid:id}}}).sort({updatedAt:-1});
        return {status:true,data:findData}
    } catch (err) {
        console.log(err)
        return {status:false,data:err}
    }
}

export const UpdateChatTimeStamp = async (id,message,last_message_from)=>{
    try {
        const update = await ChatModel.findOneAndUpdate({_id:id},{last_message:message,last_message_from:last_message_from});
        return {status:true,data:update}
    } catch (err) {
        console.log(err)
        return {status:false,data:err}
    }
}