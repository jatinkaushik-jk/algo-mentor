"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Download, Globe, Lock, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const privacySchema = z.object({
  profileVisibility: z.enum(["public", "private"]),
  showProgress: z.boolean(),
  dataSharing: z.boolean(),
  marketingEmails: z.boolean(),
});

type PrivacyFormData = z.infer<typeof privacySchema>;

const PrivacySettings = () => {
  const privacyForm = useForm<PrivacyFormData>({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      profileVisibility: "public",
      showProgress: true,
      dataSharing: false,
      marketingEmails: true,
    },
  });

  const onPrivacySubmit = (data: PrivacyFormData) => {
    console.log("Privacy data:", data);
    // Handle privacy settings update
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
        <CardDescription>
          Control how your information is shared and used
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={privacyForm.handleSubmit(onPrivacySubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div>
              <Label>Profile Visibility</Label>
              <Select defaultValue="public">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Public - Anyone can view your profile
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Private - Only you can view your profile
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-x-2">
                <div className="space-y-0.5">
                  <Label>Show Learning Progress</Label>
                  <p className="text-sm text-gray-500">
                    Allow others to see your algorithm learning progress
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between gap-x-2">
                <div className="space-y-0.5">
                  <Label>Data Sharing for AI Improvement</Label>
                  <p className="text-sm text-gray-500">
                    Help improve our AI by sharing anonymized learning data
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between gap-x-2">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-gray-500">
                    Receive emails about new features and learning tips
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-800 mb-2">Danger Zone</h4>
            <p className="text-sm text-red-700 mb-3">
              These actions are permanent and cannot be undone.
            </p>
            <div className="space-y-2 sm:space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 border-red-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download My Data
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 border-red-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full sm:w-auto">
            Save Privacy Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PrivacySettings;
