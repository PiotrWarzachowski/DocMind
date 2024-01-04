"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import Link from "next/link";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  pageName: string;
}

export function UserAuthForm({
  className,
  pageName,
  ...props
}: UserAuthFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const params = useSearchParams();

  async function handleOAuthLogin(
    event: React.MouseEvent<HTMLButtonElement>,
    provider: string
  ) {
    event.preventDefault();

    setIsLoading(true);

    const resp = await signIn(provider, {
      callbackUrl: "http://localhost:3000/dashboard",
    });
    console.log(resp);
    if (params.get("error")) {
      toast({
        variant: "destructive",
        title: "Github login failed",
        description:
          "Your github e-mail is set to private. Please make it public or use another method.",
        action: <ToastAction altText="Close">Close</ToastAction>,
        duration: 10000000,
      });
    }
    setIsLoading(false);
  }

  async function handleSignUp() {
    toast({
      variant: "destructive",
      title: "Github login failed",
      description:
        "Your github e-mail is set to private. Please try again. Make it public or use another method.",
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
    let isValid = true;
    const emailSchema = z.string().email();
    const passwordSchema = z.string().min(8);
    try {
      emailSchema.parse(email);
      setEmailError(null); // Clear the error message if the email is valid
    } catch (err) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }
    try {
      passwordSchema.parse(password);
      setPasswordError(null); // Clear the error message if the password is valid
    } catch (err) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    }

    if (isValid) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data: { user: string | null; message: string } =
          await response.json();
        if (data.user) {
          signIn("credentials", {
            email: email,
            password: password,
            callbackUrl: "http://localhost:3000/dashboard",
          });
        } else {
          setLoginError(data.message);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function handleSignIn() {
    let isValid = true;
    const emailSchema = z.string().email();
    const passwordSchema = z.string().min(8);
    try {
      emailSchema.parse(email);
      setEmailError(null); // Clear the error message if the email is valid
    } catch (err) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }
    try {
      passwordSchema.parse(password);
      setPasswordError(null); // Clear the error message if the password is valid
    } catch (err) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    }
    if (isValid) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data: { user: string | null; message: string } =
          await response.json();

        if (data.user) {
          signIn("credentials", {
            email: email,
            password: password,
            callbackUrl: "http://localhost:3000/dashboard",
          });
        } else {
          setLoginError(data.message);
        }
      } catch (error) {
        console.log("cuja");
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="grid gap-2">
        <div className="grid gap-2">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="Enter your email"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          {emailError && <p className="text-sm text-slate-800">{emailError}</p>}

          <Label className="sr-only" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            placeholder="Enter your password"
            type="password"
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          {passwordError && <p className="text-sm">{passwordError}</p>}
          {loginError && (
            <p className="text-sm text-red-500 flex align-center">
              {loginError}
            </p>
          )}
        </div>

        {pageName === "signin" && (
          <>
            <Button disabled={isLoading} onClick={() => handleSignIn()}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
            <Link
              href="/signup"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Sign Up Instead
            </Link>
          </>
        )}
        {pageName === "signup" && (
          <>
            <Button disabled={isLoading} onClick={() => handleSignUp()}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign Up with Email
            </Button>
            <Link
              href="/signin"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Sign In Instead
            </Link>
          </>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={(e) => handleOAuthLogin(e, "github")}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={(e) => handleOAuthLogin(e, "google")}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}

export default UserAuthForm;
