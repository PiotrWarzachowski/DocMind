"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { env } from "process";
export default function ClientSignOutButton() {
  return (
    <div
      onClick={() => signOut({ callbackUrl: process.env.NEXT_APP_URL! })}
      className="flex items-center"
    >
      <LogOut className="h-3 w-3 mr-2" />
      Sign Out
    </div>
  );
}
