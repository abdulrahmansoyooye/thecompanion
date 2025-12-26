"use client"
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "@/components/layout/NavItems";
import Image from "next/image";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { auth } from "@/lib/auth";

const Navbar =  () => {
    // useEffect
    return (
        <nav className="navbar">
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={46}
                        height={44}
                    />
                </div>
            </Link>
            <div className="flex items-center gap-8">
                <NavItems />
                <div className="flex ">
                    {session?.user ? (
                        <div>
                             <div> 
                        <Avatar>
                            <AvatarImage src={session.user.image ?? undefined} className="cursor-pointer"/>
                            <AvatarFallback>{session.user.name}</AvatarFallback>
                        </Avatar>
                            <Image
                                src={"/assets/profile.svg"}
                                alt="TheCompanion Logo"
                                width={30}
                                height={40}
                                className="w-[50px] h-12 aspect-[25/24] rounded relative max-sm:w-10 max-sm:h-[38px]"
                            />
                        </div>
                        </div>
                       
                    ) : (
                        <div>
                            <Link className="btn-signin" onClick={() => signIn("google", { redirectTo: "/" })}>
                                Sign In
                            </Link>
                        </div>
                    )}

                   
                </div>
            </div>
        </nav>
    )
}

export default Navbar