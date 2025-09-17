import { plans } from "@/app/pricing/plans";

export interface ISubscription {
  subscription_id: string;
  plan: IPlan;
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

export interface IPlan {
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

export interface IBillingHistory {
  date: Date;
  amount: number;
  status: "paid" | "unpaid" | "pending" | "failed" | "canceled";
  transaction_id: string;
}
