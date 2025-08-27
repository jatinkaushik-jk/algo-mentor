import { Metadata } from "next";
import LoginForm from "./LoginForm";
import AuthHeader from "../components/authHeader";

export const metadata: Metadata = {
  title: "AlgoMentor Login Page",
  description:
    "AlgoMentor Login Page, Login to AlgoMentor and get started your socratic learning jounrney.",
};

function LoginPage() {
  return (
    <>
      <AuthHeader link="/signup" label="Signup" />
      <div className="sm:w-2/3 w-4/5 space-y-8">
        <div>
          <h2 className="scroll-m-20 text-4xl font-bold tracking-tight mb-1">
            Login to account
          </h2>
          <p className="text-muted-foreground">Access your account and continue your learning journey.</p>
        </div>
        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;
