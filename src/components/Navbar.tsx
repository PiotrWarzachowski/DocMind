import MaxWidthWrapper from "./MaxWidthWrapper"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { SignInButton, SignUpButton , auth, UserButton} from "@clerk/nextjs";


const Navbar = () => {
    
    const {userId} = auth();
    
    console.log(userId);

  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
        <MaxWidthWrapper>
            <div className="flex h-14 items-center justify-between border-b border-zinc-200">
                <Link href="/" className="flex z-40 font-semibold">
                    <span>DocMind.</span>
                </Link>
                {/* TODO: add mobile navbar */}

                <div className="hidden items-center space-x-4 sm:flex">
                    {!userId && (
                        <>
                        <Link href="/upload" className={buttonVariants({
                            variant : 'ghost',
                            size : 'sm'
                        })}>
                            Upload
                        </Link>
                        <SignInButton>
                            <button className={buttonVariants({
                            variant : 'ghost',
                            size : 'sm'
                            })}>
                                Sign In
                            </button>
                        </SignInButton>         

                        <SignUpButton>
                        <button className={buttonVariants({
                            size : 'sm'
                            })}>
                                Sign Up
                            </button>
                        </SignUpButton>               
                    </>
                    )}
                    {userId && (
                        <Link href="/profile" className={buttonVariants({
                            variant : 'ghost',
                            size : 'sm'})}>Profile</Link>

                    )}
                    <div className="ml-auto">
                        <UserButton afterSignOutUrl="/"/>
                    </div>

                </div>
            </div>
        </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar