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
      <div className="sm:w-2/3 w-4/5">
        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;
