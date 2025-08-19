import React, { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUserContext } from "@/context/UserProvider";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const formElm = useRef<HTMLFormElement>(null);
  const { submitContactRequest } = useUserContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // error -> field values are not showing in email
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(async () => {
      submitContactRequest(formElm?.current as HTMLFormElement).then(() => {
        reset();
      });
    })();
  };
  return (
    <form
      ref={formElm}
      className="mt-6 space-y-5"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            {...register("name")}
            name="name"
            type="text"
            placeholder="Name"
            autoComplete="name"
            className={errors.name ? "border-red-500" : ""}
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className="text-red-600 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="email">Your Email</Label>
          <Input
            id="email"
            {...register("email")}
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            className={errors.email ? "border-red-500" : ""}
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email.message}</span>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          {...register("subject")}
          name="subject"
          type="text"
          placeholder="E.g. Need help with sorting algorithms"
          className={errors.subject ? "border-red-500" : ""}
          disabled={isSubmitting}
        />
        {errors.subject && (
          <span className="text-red-600 text-sm">{errors.subject.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          {...register("message")}
          name="message"
          placeholder="Write your message"
          className={errors.message ? "border-red-500" : ""}
          disabled={isSubmitting}
        />
        {errors.message && (
          <span className="text-red-600 text-sm">{errors.message.message}</span>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
      {isSubmitSuccessful && (
        <div className="text-green-700 text-center mt-2">
          Thank you for contacting AlgoMentor! We&apos;ll respond soon.
        </div>
      )}
    </form>
  );
};

export default ContactForm;
