import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import SignInForm from "@/components/Auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In | MKTV Admin Dashboard",
  description: "Sign in to access your MKTV Admin Dashboard",
};

const SignIn = () => {
  return (
    <div className="login-container">
      {/* Background shapes */}
      <div className="login-shape login-shape-1"></div>
      <div className="login-shape login-shape-2"></div>
      <div className="login-shape login-shape-3"></div>

      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="login-form-container">
          <div className="mb-8 text-center">
            <Link href="/" className="mb-6 inline-block">
              <Image
                className="dark:hidden"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={176}
                height={32}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo.png"
                alt="Logo"
                width={176}
                height={32}
              />
            </Link>
            <h1>Sign In to MKTV</h1>
          
            <p className="text-base text-body-color dark:text-body-color-dark">
              Welcome back! Please sign in to continue.
            </p>
          </div>

          <SignInForm />

          <p className="mt-8 text-center text-base text-body-color dark:text-body-color-dark">
            Don  &apost have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 