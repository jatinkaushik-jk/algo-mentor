"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NotificationsSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose what notifications you want to receive
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Learning Progress</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-medium">Daily Streak Reminders</p>
                  <p className="text-sm text-gray-500">
                    Get reminded to maintain your learning streak
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-medium">Weekly Progress Reports</p>
                  <p className="text-sm text-gray-500">
                    Receive weekly summaries of your progress
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-medium">Algorithm Mastery Celebrations</p>
                  <p className="text-sm text-gray-500">
                    Get notified when you master new algorithms
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Platform Updates</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-medium">New Algorithm Releases</p>
                  <p className="text-sm text-gray-500">
                    Be first to know about new algorithms added
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-medium">Feature Updates</p>
                  <p className="text-sm text-gray-500">
                    Learn about new platform features
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Communication</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-medium">Direct Messages</p>
                  <p className="text-sm text-gray-500">
                    Get notified about new messages from other users
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-medium">Learning Tips</p>
                  <p className="text-sm text-gray-500">
                    Receive helpful algorithm learning tips
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <Button className="w-full sm:w-auto">
            Save Notification Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsSettings;
