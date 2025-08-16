"use client";
import { useState } from "react";
import { User, Shield, Palette, CreditCard, Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "./ProfileSettings";
import PrivacySettings from "./PrivacySettings";
import AppearanceSettings from "./AppearanceSettings";
import BillingSettings from "./BillingSettings";
import NotificationsSettings from "./NotificationsSettings";

const TabList = () => {
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:flex">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Profile</span>
        </TabsTrigger>
        <TabsTrigger value="privacy" className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span className="hidden sm:inline">Privacy</span>
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          <span className="hidden sm:inline">Appearance</span>
        </TabsTrigger>
        <TabsTrigger value="billing" className="flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          <span className="hidden sm:inline">Billing</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="w-4 h-4" />
          <span className="hidden sm:inline">Notifications</span>
        </TabsTrigger>
      </TabsList>

      {/* Profile Tab */}
      <TabsContent value="profile" className="space-y-6">
        <ProfileSettings />
      </TabsContent>

      {/* Privacy Tab */}
      <TabsContent value="privacy" className="space-y-6">
        <PrivacySettings />
      </TabsContent>

      {/* Appearance Tab */}
      <TabsContent value="appearance" className="space-y-6">
        <AppearanceSettings />
      </TabsContent>

      {/* Billing Tab */}
      <TabsContent value="billing" className="space-y-6">
        <BillingSettings />
      </TabsContent>

      {/* Notifications Tab */}
      <TabsContent value="notifications" className="space-y-6">
        <NotificationsSettings />
      </TabsContent>
    </Tabs>
  );
};

export default TabList;
