"use client";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserProvider";
import { useEffect, useState } from "react";
import { ISubscription } from "@/interfaces/subscription.interface";

const billingHistory = [
  {
    date: "2024-01-01",
    amount: "$19.99",
    status: "Paid",
  },
  {
    date: "2023-12-01",
    amount: "$19.99",
    status: "Paid",
  },
  {
    date: "2023-11-01",
    amount: "$19.99",
    status: "Paid",
  },
];
const BillingSettings = () => {
  const { getSubscription } = useUserContext();
  const [subscription, setSubscription] = useState<ISubscription | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      const sub = await getSubscription();
      setSubscription(sub);
    };
    fetchSubscription();
  }, [getSubscription]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
        <CardDescription>
          Manage your subscription and payment methods
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current Plan */}
          <div className="bg-blue-50 dark:bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] dark:from-[#1d4ed8] dark:via-[#1e40af] dark:to-[#111827] border border-blue-200 dark:border-0 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-blue-800 dark:text-white">
                Current Plan
              </h4>
              <Badge variant="outline">
                {subscription ? subscription.plan.name : "Loading..."}
              </Badge>
            </div>
            <p className="text-sm text-blue-700 dark:text-white/80 mb-3">
              {subscription ? subscription.plan.description : "Loading..."}
            </p>
            <div className="flex items-center justify-between flex-wrap gap-x-2 gap-y-4">
              {subscription ? (
                <span className="text-2xl font-bold text-blue-800 dark:text-white">
                  {subscription.plan.price}{" "}
                  <span className="text-lg">
                    ({subscription.plan.duration})
                  </span>
                </span>
              ) : (
                <span className="text-2xl font-bold text-blue-800 dark:text-white">
                  Loading...
                </span>
              )}
              <Button size="sm" variant="outline">
                Change Plan
              </Button>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="font-medium mb-4">Payment Methods</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/26</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Default</Badge>
                  <Button size="sm" variant="ghost">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
            <Button variant="outline" className="mt-3">
              Add Payment Method
            </Button>
          </div>

          {/* Billing History */}
          <div>
            <h4 className="font-medium mb-4">Billing History</h4>
            <div className="space-y-2">
              {billingHistory.map((invoice, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{invoice.amount}</p>
                    <p className="text-sm text-gray-500">{invoice.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-600"
                    >
                      {invoice.status}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingSettings;
