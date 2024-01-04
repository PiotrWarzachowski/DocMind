"use client";
// pages/auth/signin.tsx
import { signIn } from "next-auth/react";
import React from "react";

const SignInPage = () => {
  const handleSignIn = (
    e: React.MouseEvent<HTMLButtonElement>,
    provider: string
  ) => {
    e.preventDefault();
    signIn(provider, { callbackUrl: "http://localhost:3000/dashboard" });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={(e) => handleSignIn(e, "github")}>
        Sign in with GitHub
      </button>
      <button onClick={(e) => handleSignIn(e, "google")}>
        Sign in with Google
      </button>
    </div>
  );
};

export default SignInPage;
