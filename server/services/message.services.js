import {pusher} from "../index.js";

const CreateMessage = (req, res) => {
    console.log(process.env.PUSHER_APPID)
    const data = req.body
    pusher.trigger("newdata","newMessage",data)
    console.log(data)
    res.send("comp")
};

export { CreateMessage }