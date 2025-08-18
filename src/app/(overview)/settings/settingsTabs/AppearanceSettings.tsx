"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Moon, Sun, Monitor } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useTheme } from "next-themes";

const appearanceSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  language: z.string(),
});

type AppearanceFormData = z.infer<typeof appearanceSchema>;

const AppearanceSettings = () => {
  const { setTheme } = useTheme();
  const appearanceForm = useForm<AppearanceFormData>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      theme: (localStorage.getItem("theme") as AppearanceFormData["theme"]) || "system",
      language: (localStorage.getItem("language") as AppearanceFormData["language"]) || "en",
    },
  });

  const onAppearanceSubmit = (data: AppearanceFormData) => {
    console.log("Appearance data:", data);
    localStorage.setItem("theme", data.theme);
    localStorage.setItem("language", data.language);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the look and feel of AlgoMentor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...appearanceForm}>
          <form
            onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={appearanceForm.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Theme</FormLabel>
                    <FormControl>
                      <div>
                        <Select {...field} onValueChange={(value) => {
                          field.onChange(value);
                          setTheme(value);
                        }}>
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
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={appearanceForm.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <div>
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="hi">Hindi</SelectItem>
                            {/* Only english available right now */}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full sm:w-auto">
              Save Appearance Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
