import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    message: {
      type: String,
    },
    chat_id: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    from: {
      type: String,
    },
    fromName: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("messageContent", MessageSchema);
