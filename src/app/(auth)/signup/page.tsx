import { Metadata } from "next";
import SignupForm from "./SignupForm";
import AuthHeader from "../components/authHeader";

export const metadata: Metadata = {
  title: "AlgoMentor Signup Page",
  description:
    "AlgoMentor Signup Page, Signup and get started your socratic learning jounrney through AlgoMentor.",
};

function SignUpPage() {
  return (
    <>
      <AuthHeader link="/login" label="Login" />
      <div className="sm:w-2/3 w-4/5">
        <SignupForm />
      </div>
      <p className="text-sm mt-6 w-4/5 sm:w-2/3">
        By creating your account, you agree to the{" "}
        <a
          href="/terms-of-service"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Privacy Notice
        </a>
        .
      </p>
    </>
  );
}

export default SignUpPage;
