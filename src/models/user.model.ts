import mongoose, { Schema } from "mongoose";
// import { Message } from "@/components/ui/chat-message";
// For type checking by typescript

export interface Algorithm {
  algoID: string;
  title: string;
  description: string;
  timeComplexity: string;
  label: string;
  category: string;
  difficulty: DifficultyValues;
}
export interface Conversation {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: Date;
  // parts?: [
  //   {
  //     type: string;
  //     text: string;
  //   },
  // ];
}
export enum DifficultyValues{
  easy = "Easy",
  medium = "Medium",
  hard = "Hard"
}
export enum StateValues{
  pending = "PENDING",
  completed = "COMPLETED"
}

export interface Module {
  state: StateValues;
  algorithm: Algorithm;
  conversation: Conversation[];
}

export interface User {
  email: string;
  username: string;
  password: string;
  modules: Module[];
}

const AlgorithmSchema = new Schema(
  {
    algoID: String,
    title: String,
    description: String,
    timeComplexity: String,
    label: String,
    category: String,
    difficulty: {
      type: String,
      enum: Object.values(DifficultyValues)
    },
  },
  { _id: false }
);
const ConversationSchema = new Schema(
  {
    id: String,
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: String,
    createdAt: { type: Date, default: new Date() },
    // parts: [
    //   {
    //     type: String,
    //     text: String,
    //   },
    // ],
  },
  { _id: false }
);

const ModuleSchema = new Schema(
  {
    state: {
      type: String,
      enum: Object.values(StateValues),
      default: StateValues.pending,
    },
    algorithm: AlgorithmSchema,
    conversation: [ConversationSchema],
  },
  { _id: false }
);

const UserSchema = new Schema({
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

const UserModel = mongoose.models?.User || mongoose.model("User", UserSchema);

export default UserModel;
