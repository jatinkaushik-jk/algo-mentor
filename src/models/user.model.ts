import { plans } from "@/app/pricing/plans";
import mongoose, { Schema } from "mongoose";

export interface Algorithm {
  algoID: string;
  title: string;
  description: string;
  timeComplexity: string;
  label: string;
  category: string;
  difficulty: DifficultyValues;
  access: AccessValues;
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
export interface Plan {
  planID: string;
  name: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Store icon as a string (e.g., icon name or path)
  price: number;
  duration: "monthly" | "yearly";
  description: string;
  features: string[];
  cta: string;
}

export interface Subscription {
  subscription_id: string;
  plan: Plan;
  status: "active" | "inactive";
  startDate: Date;
  endDate: Date | null;
  payment_info: {
    method: string; // e.g., "credit_card" | "paypal" | "upi"
    amount: number;
    status: string; // e.g., "paid" | "unpaid" | "pending" | "failed" | "canceled"
    transaction_id: string;
  };
}
export const defaultSubscription = {
  subscription_id: "",
  plan: { ...plans[0], icon: plans[0].icon.displayName },
  status: "active",
  startDate: new Date(),
  endDate: null,
  payment_info: {
    method: "",
    amount: 0,
    status: "paid",
    transaction_id: "",
  },
};
export enum DifficultyValues {
  easy = "Easy",
  medium = "Medium",
  hard = "Hard",
}
export enum StateValues {
  pending = "PENDING",
  completed = "COMPLETED",
}
export enum AccessValues {
  free = "FREE",
  pro = "PRO",
  master = "MASTER",
}

export interface Module {
  state: StateValues;
  algorithm: Algorithm;
  conversation: Conversation[];
}
export interface Streak {
  current: number;
  highest: number;
  lastLoginDate: Date | null;
}
export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  location: string;
  website: string;
  goals: string;
}
export interface BillingHistory {
  date: Date;
  amount: number;
  status: "paid" | "unpaid" | "pending" | "failed" | "canceled";
  transaction_id: string;
}
export interface User {
  email: string;
  username: string;
  password: string;
  profile: UserProfile;
  subscription: Subscription;
  streak: Streak;
  modules: Module[];
  createdAt: Date;
  updatedAt: Date | null;
  settings: {
    privacy: {
      profileVisibility: "public" | "private";
      marketingOptIn: boolean;
      dataSharing: boolean;
    };
    billing: {
      paymentMethod: ["credit_card", "paypal", "upi"];
      billingHistory: BillingHistory[];
    };
    notification: {
      emailNotifications: true;
      smsNotifications: false;
    };
  };
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
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    bio: String,
    avatar: String,
    location: String,
    website: String,
    goals: String,
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

const UserModel = mongoose.models?.User || mongoose.model("User", UserSchema);

export default UserModel;
