import {
  AccessValues,
  DifficultyValues,
  StateValues,
} from "@/interfaces/algorithms.interface";
import mongoose, { Schema } from "mongoose";
import { defaultSubscription } from "../interfaces/subscription.interface";
import { IUser } from "@/interfaces/user.interface";

interface User extends mongoose.Document, IUser {}

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
      enum: Object.values(DifficultyValues),
    },
    access: {
      type: String,
      enum: Object.values(AccessValues),
      default: AccessValues.free,
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

const PlanSchema = new Schema(
  {
    planID: String,
    name: String,
    label: String,
    icon: { type: String, required: true }, // Store icon as a string (e.g., icon name or path)
    price: Number,
    duration: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },
    description: String,
    features: [String],
    cta: String,
  },
  { _id: false }
);

const SubscriptionSchema = new Schema(
  {
    subscription_id: String,
    plan: PlanSchema,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    startDate: { type: Date, default: new Date() },
    endDate: { type: Date, default: null },
    payment_info: {
      method: String,
      amount: Number,
      status: String, // e.g., "paid" | "unpaid" | "pending" | "failed" | "canceled"
      transaction_id: String,
    },
  },
  { _id: false }
);

const emailRegExp =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    // Regular expression for email validation
    match: [emailRegExp, "Please use a valid email address"],
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
  profile: {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    learningGoals: {
      type: String,
      default: "",
    },
  },
  subscription: {
    type: SubscriptionSchema,
    default: defaultSubscription,
  },
  streak: {
    current: { type: Number, default: 1 },
    highest: { type: Number, default: 1 },
    lastLoginDate: { type: Date, default: null },
  },
  modules: [ModuleSchema],
  settings: {
    privacy: {
      profileVisibility: {
        type: String,
        enum: ["public", "private"],
        default: "public",
      },
      marketingOptIn: {
        type: Boolean,
        default: true,
      },
      dataSharing: {
        type: Boolean,
        default: true,
      },
    },
    billing: {
      paymentMethod: {
        type: [String],
        enum: ["credit_card", "paypal", "upi"],
      },
      billingHistory: [
        {
          date: { type: Date, default: new Date() },
          amount: { type: Number, required: true },
          status: {
            type: String,
            enum: ["paid", "unpaid", "pending", "failed", "canceled"],
            required: true,
          },
          transaction_id: { type: String, required: true },
        },
      ],
    },
    notification: {
      emailNotifications: { type: Boolean, default: true },
      smsNotifications: { type: Boolean, default: false },
    },
  },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: null },
});

const UserModel =
  mongoose.models?.User || mongoose.model<User>("User", UserSchema);

export default UserModel;
