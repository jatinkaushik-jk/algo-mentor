import { Resend } from 'resend';
import { Message } from '@/model/user';
import VerificationEmail from '@/components/email-template';

export const resend = new Resend(process.env.RESEND_API_KEY);

export interface ApiResponse{
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean; // ? makes this field optional
    messages?: Array<Message>
}

export async function sendVerificationEmail(email:string, username: string, verifyCode: string): Promise<ApiResponse> {
    try {

        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verification Code from AlgoMentor',
            react: VerificationEmail({ username, otp:verifyCode }),
          });

        return {success: true, message: "Verification Email send successfully"}
        
    } catch (error) {
        console.error("Error in sending verification email", error);   
        return {success: false, message: "Failed to send verification email"}     
    }
}