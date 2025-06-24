import mongoose, { Schema, Document } from "mongoose";

interface IMessage {
  role: string;
  parts: { text: string }[];
}

interface IConversation extends Document {
  userId: string;
  messages: IMessage[];
}

const MessageSchema = new Schema<IMessage>({
  role: { type: String, required: true },
  parts: [{ text: { type: String, required: true } }],
});

const ConversationSchema = new Schema<IConversation>({
  userId: { type: String, required: true },
  messages: [MessageSchema],
});

export default mongoose.models.Conversation ||
  mongoose.model<IConversation>("Conversation", ConversationSchema);
