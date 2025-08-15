"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  location: z.string().optional(),
  learningGoals: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfileSettings = () => {
  const [profileImage, setProfileImage] = useState<string>(
    "/api/placeholder/150/150"
  );
  const [uploading, setUploading] = useState(false);

  // Form hooks
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "",
      bio: "Learning algorithms with AlgoMentor",
      website: "",
      location: "New York, USA",
      learningGoals: "Master data structures and algorithms",
    },
  });

  // Form submit handlers
  const onProfileSubmit = (data: ProfileFormData) => {
    console.log("Profile data:", data);
    // Handle profile update API call
  };
  // Profile image upload handler
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "algomentor_profiles"); // Cloudinary preset

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/your-cloud-name/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setProfileImage(data.secure_url);
        // You would typically save this to your backend here
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information and profile settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={profileForm.handleSubmit(onProfileSubmit)}
          className="space-y-6"
        >
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
              {uploading && (
                <p className="text-sm text-blue-600">Uploading...</p>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...profileForm.register("firstName")}
                className={
                  profileForm.formState.errors.firstName ? "border-red-500" : ""
                }
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
                {...profileForm.register("lastName")}
                className={
                  profileForm.formState.errors.lastName ? "border-red-500" : ""
                }
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
                {...profileForm.register("email")}
                className={
                  profileForm.formState.errors.email ? "border-red-500" : ""
                }
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
                {...profileForm.register("phone")}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                {...profileForm.register("location")}
                placeholder="City, Country"
              />
            </div>

            <div>
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                {...profileForm.register("website")}
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
              {...profileForm.register("bio")}
              placeholder="Tell us about yourself..."
              rows={3}
              className="resize-none"
            />
            <p className="text-sm text-gray-500 mt-1">
              {profileForm.watch("bio")?.length || 0}/500 characters
            </p>
          </div>

          <div>
            <Label htmlFor="learningGoals">Learning Goals (Optional)</Label>
            <Textarea
              id="learningGoals"
              {...profileForm.register("learningGoals")}
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
  );
};

export default ProfileSettings;
