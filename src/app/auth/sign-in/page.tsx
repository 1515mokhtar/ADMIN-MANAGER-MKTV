import SigninWithPassword from "@/components/Auth/SigninWithPassword";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignIn() {
  return <SigninWithPassword />;
}
