"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
export default function ClientSignOutButton() {
  return (
    <div
      onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
      className="flex items-center"
    >
      <LogOut className="h-3 w-3 mr-2" />
      Sign Out
    </div>
  );
}
