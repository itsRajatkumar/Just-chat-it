import { pusher } from "../index.js";
import { ErrorResponse, SuccessResponse } from "../Utills/Responces.js";
import { UpdateChatTimeStamp } from "../workers/chat.workers.js";
import { CreateMessage,GetMessagebyChatID } from "../workers/message.workers.js";

const CreateMessageRoute = async (req, res) => {
  try {
    const data = req.body;
    const responce = await CreateMessage(data);
    // console.log(responce);
    const update = await UpdateChatTimeStamp(data.chat_id,data.message,data.fromName)
    if (responce.status) {
      pusher.trigger(data.chat_id, "new-message", responce.data);
      return SuccessResponse(res, 201, "Created", responce.data);
    } else {
      return ErrorResponse(res, 404, "Error");
    }
  } catch (err) {
    console.log(err)
    ErrorResponse(res, 500, "Internal Server Error");
  }
};

const GetAllMessageRoute = async (req, res) => {
  try {
    const {id} = req.params
    const {page} = req.query
    console.log(id)
    const responce = await GetMessagebyChatID(id,page-1);
    if (responce.status) {
      return SuccessResponse(res, 201, "Created", responce.data);
    } else {
      return ErrorResponse(res, 404, "Error");
    }
  } catch (err) {
    console.log(err)
    ErrorResponse(res, 500, "Internal Server Error");
  }
};

export { CreateMessageRoute,GetAllMessageRoute };
