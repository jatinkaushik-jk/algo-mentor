import {
  IBillingHistory,
  ISubscription,
} from "@/interfaces/subscription.interface";
import { IModule } from "./algorithms.interface";

export interface IUser {
  email: string;
  username: string;
  password: string;
  profile: IUserProfile;
  subscription: ISubscription;
  streak: IStreak;
  modules: IModule[];
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
      billingHistory: IBillingHistory[];
    };
    notification: {
      emailNotifications: true;
      smsNotifications: false;
    };
  };
}

export interface IUserProfile {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  location?: string;
  website?: string;
  learningGoals?: string;
}

export interface IStreak {
  current: number;
  highest: number;
  lastLoginDate: Date | null;
}
