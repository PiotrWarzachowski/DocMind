"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
export default function ClientSignOutButton() {
  return (
    <div
      onClick={() => signOut({ callbackUrl: "https://doc-mind.vercel.app" })}
      className="flex items-center"
    >
      <LogOut className="h-3 w-3 mr-2" />
      Sign Out
    </div>
  );
}
