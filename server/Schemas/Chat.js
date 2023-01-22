import mongoose from "mongoose";

const ChatSchema = mongoose.Schema(
  {
    chat_Name: {
      type: String,
    },
    group_img: {
      type: String,
    },
    last_message: {
      type: String,
      default:""
    },
    last_message_from: {
      type: String,
      default:""
    },
    members :[
      {
        uid:{
          type:String,
        },
        displayName:{
          type:String
        },
        userImage:{
          type:String
        }
      }
    ],
    is_group: {
      type: Boolean,
      default:false
    },
  },
  { timestamps: true }
);

export default mongoose.model("chat", ChatSchema);
