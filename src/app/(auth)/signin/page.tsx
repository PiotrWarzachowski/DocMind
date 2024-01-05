"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// pages/auth/signin.tsx
import { signIn } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserAuthForm } from "@/components/UserAuthForm";
import { Icons } from "@/components/Icons";

const SignInPage = () => {
  const handleSignIn = (
    e: React.MouseEvent<HTMLButtonElement>,
    provider: string
  ) => {
    e.preventDefault();
    signIn(provider, { callbackUrl: process.env.NEXT_APP_URL! + "/dashboard" });
  };

  return (
    <>
      <div className="container relative  h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-primary" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link href="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-10 w-10"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              <h1 className="text-2xl">Docmind</h1>
            </Link>
          </div>
          <div className="relative z-20 mt-auto flex flex-col justify-end items-start">
            <blockquote className="space-y-2 mb-4 p-6">
              <p className="text-lg">
                &ldquo;This application has saved me countless hours of work and
                helped me deliver stunning papers to my clients faster than ever
                before.&rdquo;
              </p>
              <footer className="text-sm">Adam Back</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome Back!
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to get started
              </p>
            </div>

            <UserAuthForm pageName="signin" />

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignInPage;
