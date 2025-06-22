import mongoose, { Schema, Document } from "mongoose";
import { Message } from "@/components/ui/chat-message";
// For type checking by typescript

export interface Algorithm extends Document {
  algoID: string;
  title: string;
  description: string;
  timeComplexity: string;
  label: string;
  difficulty: string;
}
export interface ChatHistory extends Document {
  role: string;
  parts: [
    {
      text: string;
    },
  ];
}
export interface Module extends Document {
  state: string;
  algos: [Algorithm];
  chatHistory: Message[];
}

export interface User extends Document {
  email: string;
  username: string;
  password: string;
  modules: [Module];
}

const AlgorithmSchema: Schema<Algorithm> = new Schema(
  {
    algoID: String,
    title: String,
    description: String,
    timeComplexity: String,
    label: String,
    difficulty: String,
  },
  { _id: false }
);
const ChatHistorySchema: Schema<ChatHistory> = new Schema(
  {
    role: String,
    parts: [
      {
        text: String,
      },
    ],
  },
  { _id: false }
);

const ModuleSchema: Schema<Module> = new Schema(
  {
    state: {
      type: String,
      default: "pending",
    },
    algos: [AlgorithmSchema],
    chatHistory: [ChatHistorySchema],
  },
  { _id: false }
);

const UserSchema: Schema<User> = new Schema({
  email: {
    type: String,
    unique: true,
    // RegeX expression for email validation
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
      "Please use a valid email address",
    ],
    trim: true,
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Password is required"],
  },
  modules: [ModuleSchema],
});

const UserModel =
  (mongoose.models?.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
