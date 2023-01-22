import { pusher } from "../index.js";
import { ErrorResponse, SuccessResponse } from "../Utills/Responces.js";
import { CreateChat,GetChatByUserID } from "../workers/chat.workers.js";

const CreateChatRoute = async (req, res) => {
  try {
    const data = req.body;
    const responce = await CreateChat(data);
    console.log(responce)
    if (responce.status) {
      return SuccessResponse(res, 201, "Created", responce.data);
    } else {
      return ErrorResponse(res, 404, "Error");
    }
    // pusher.trigger("newdata","newMessage",data)
    console.log(data);
  } catch (err) {
    ErrorResponse(res, 500, "Internal Server Error");
  }
};

const GetAllChatRoute = async (req, res) => {
  try {
    const {id} = req.params
    const responce = await GetChatByUserID(id);
    console.log(responce)
    if (responce.status) {
      return SuccessResponse(res, 201, "Created", responce.data);
    } else {
      return ErrorResponse(res, 404, "Error");
    }
    // pusher.trigger("newdata","newMessage",data)
    console.log(data);
  } catch (err) {
    ErrorResponse(res, 500, "Internal Server Error");
  }
};

export { CreateChatRoute,GetAllChatRoute };
