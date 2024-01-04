import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Book, MessageCircle, LogOut, Settings } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import ClientSignOutButton from "./ClientSignOutButton";
import { Icons } from "./Icons";
const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold items-center">
            <Icons.logo className="h-8 w-8 mr-2" />
            <span className="text-xl font-semibold">DocMind</span>
          </Link>
          {/* TODO: add mobile navbar */}

          <div className="hidden items-center space-x-4 sm:flex">
            {!user && (
              <>
                <Link
                  href="/upload"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Upload
                </Link>
                <Link href="/signin">
                  <button
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    Sign In
                  </button>
                </Link>

                <Link href="/signup">
                  <button
                    className={buttonVariants({
                      size: "sm",
                    })}
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.image!} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="h-3 w-3 mr-2" />
                      Settings
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <ClientSignOutButton />
                    </DropdownMenuItem>
                    <DropdownMenuLabel>Help</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Book className="h-3 w-3 mr-2" />
                      Docs
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageCircle className="h-3 w-3 mr-2" />
                      Support
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
