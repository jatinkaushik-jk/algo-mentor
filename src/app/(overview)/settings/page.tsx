'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  User,
  Shield,
  Palette,
  CreditCard,
  Bell,
  Lock,
  Camera,
  Moon,
  Sun,
  Monitor,
  Trash2,
  Download,
  Globe,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

// Form schemas
const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  location: z.string().optional(),
  learningGoals: z.string().optional(),
});

const privacySchema = z.object({
  profileVisibility: z.enum(['public', 'private', 'friends']),
  showProgress: z.boolean(),
  allowMessages: z.boolean(),
  dataSharing: z.boolean(),
  marketingEmails: z.boolean(),
});

const appearanceSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  language: z.string(),
  fontSize: z.enum(['small', 'medium', 'large']),
  codeTheme: z.string(),
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PrivacyFormData = z.infer<typeof privacySchema>;
type AppearanceFormData = z.infer<typeof appearanceSchema>;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState<string>('/api/placeholder/150/150');
  const [uploading, setUploading] = useState(false);

  // Form hooks
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '',
      bio: 'Learning algorithms with AlgoMentor',
      website: '',
      location: 'New York, USA',
      learningGoals: 'Master data structures and algorithms',
    },
  });

  const privacyForm = useForm<PrivacyFormData>({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      profileVisibility: 'public',
      showProgress: true,
      allowMessages: true,
      dataSharing: false,
      marketingEmails: true,
    },
  });

  const appearanceForm = useForm<AppearanceFormData>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      theme: 'system',
      language: 'en',
      fontSize: 'medium',
      codeTheme: 'vs-dark',
    },
  });

  // Profile image upload handler
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'algomentor_profiles'); // Cloudinary preset

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/your-cloud-name/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setProfileImage(data.secure_url);
        // You would typically save this to your backend here
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  // Form submit handlers
  const onProfileSubmit = (data: ProfileFormData) => {
    console.log('Profile data:', data);
    // Handle profile update API call
  };

  const onPrivacySubmit = (data: PrivacyFormData) => {
    console.log('Privacy data:', data);
    // Handle privacy settings update
  };

  const onAppearanceSubmit = (data: AppearanceFormData) => {
    console.log('Appearance data:', data);
    // Handle appearance settings update
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your AlgoMentor account and preferences</p>
        </div>

        {/* Settings Tabs */}
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
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and profile settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={profileImage} alt="Profile" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer transition-colors">
                        <Camera className="w-4 h-4" />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    <div>
                      <h3 className="font-medium">Profile Picture</h3>
                      <p className="text-sm text-gray-500">
                        JPG, PNG up to 5MB. Recommended: 400x400px
                      </p>
                      {uploading && <p className="text-sm text-blue-600">Uploading...</p>}
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        {...profileForm.register('firstName')}
                        className={profileForm.formState.errors.firstName ? 'border-red-500' : ''}
                      />
                      {profileForm.formState.errors.firstName && (
                        <p className="text-sm text-red-600 mt-1">
                          {profileForm.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        {...profileForm.register('lastName')}
                        className={profileForm.formState.errors.lastName ? 'border-red-500' : ''}
                      />
                      {profileForm.formState.errors.lastName && (
                        <p className="text-sm text-red-600 mt-1">
                          {profileForm.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...profileForm.register('email')}
                        className={profileForm.formState.errors.email ? 'border-red-500' : ''}
                      />
                      {profileForm.formState.errors.email && (
                        <p className="text-sm text-red-600 mt-1">
                          {profileForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...profileForm.register('phone')}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Location (Optional)</Label>
                      <Input
                        id="location"
                        {...profileForm.register('location')}
                        placeholder="City, Country"
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Website (Optional)</Label>
                      <Input
                        id="website"
                        type="url"
                        {...profileForm.register('website')}
                        placeholder="https://your-website.com"
                      />
                      {profileForm.formState.errors.website && (
                        <p className="text-sm text-red-600 mt-1">
                          {profileForm.formState.errors.website.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio (Optional)</Label>
                    <Textarea
                      id="bio"
                      {...profileForm.register('bio')}
                      placeholder="Tell us about yourself..."
                      rows={3}
                      className="resize-none"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {profileForm.watch('bio')?.length || 0}/500 characters
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="learningGoals">Learning Goals (Optional)</Label>
                    <Textarea
                      id="learningGoals"
                      {...profileForm.register('learningGoals')}
                      placeholder="What do you want to achieve with AlgoMentor?"
                      rows={2}
                      className="resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full sm:w-auto">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control how your information is shared and used
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={privacyForm.handleSubmit(onPrivacySubmit)} className="space-y-6">
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
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Show Learning Progress</Label>
                          <p className="text-sm text-gray-500">
                            Allow others to see your algorithm learning progress
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Allow Direct Messages</Label>
                          <p className="text-sm text-gray-500">
                            Let other users send you direct messages
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Data Sharing for AI Improvement</Label>
                          <p className="text-sm text-gray-500">
                            Help improve our AI by sharing anonymized learning data
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
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
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="text-red-600 border-red-300">
                        <Download className="w-4 h-4 mr-2" />
                        Download My Data
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-300">
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
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of AlgoMentor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Theme</Label>
                      <Select defaultValue="system">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">
                            <div className="flex items-center gap-2">
                              <Sun className="w-4 h-4" />
                              Light
                            </div>
                          </SelectItem>
                          <SelectItem value="dark">
                            <div className="flex items-center gap-2">
                              <Moon className="w-4 h-4" />
                              Dark
                            </div>
                          </SelectItem>
                          <SelectItem value="system">
                            <div className="flex items-center gap-2">
                              <Monitor className="w-4 h-4" />
                              System
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="zh">中文</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Font Size</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Code Editor Theme</Label>
                      <Select defaultValue="vs-dark">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vs-dark">VS Code Dark</SelectItem>
                          <SelectItem value="vs-light">VS Code Light</SelectItem>
                          <SelectItem value="monokai">Monokai</SelectItem>
                          <SelectItem value="github">GitHub</SelectItem>
                          <SelectItem value="dracula">Dracula</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full sm:w-auto">
                    Save Appearance Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
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
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-blue-800">Current Plan</h4>
                      <Badge variant="secondary">PRO</Badge>
                    </div>
                    <p className="text-sm text-blue-700 mb-3">
                      Full access to all algorithms and premium features
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-800">$19.99/month</span>
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
                            <p className="text-sm text-gray-500">Expires 12/24</p>
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
                      {[
                        { date: '2024-01-01', amount: '$19.99', status: 'Paid' },
                        { date: '2023-12-01', amount: '$19.99', status: 'Paid' },
                        { date: '2023-11-01', amount: '$19.99', status: 'Paid' },
                      ].map((invoice, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{invoice.amount}</p>
                            <p className="text-sm text-gray-500">{invoice.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-green-600 border-green-600">
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
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
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
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Daily Streak Reminders</p>
                          <p className="text-sm text-gray-500">Get reminded to maintain your learning streak</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Weekly Progress Reports</p>
                          <p className="text-sm text-gray-500">Receive weekly summaries of your progress</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Algorithm Mastery Celebrations</p>
                          <p className="text-sm text-gray-500">Get notified when you master new algorithms</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Platform Updates</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Algorithm Releases</p>
                          <p className="text-sm text-gray-500">Be first to know about new algorithms added</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Feature Updates</p>
                          <p className="text-sm text-gray-500">Learn about new platform features</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Communication</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Direct Messages</p>
                          <p className="text-sm text-gray-500">Get notified about new messages from other users</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Learning Tips</p>
                          <p className="text-sm text-gray-500">Receive helpful algorithm learning tips</p>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
