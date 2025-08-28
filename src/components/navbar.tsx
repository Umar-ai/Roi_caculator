
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; // for icons

function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const signingOut = () => {
    try {
      signOut();
      router.replace("/login");
    } catch (error) {
      console.log("Something went wrong while signing out");
    }
  };

  return (
    <nav className="p-4 md:p-6 shadow-md  text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href={"/home"}>
          <button className="text-xl font-bold">Roi Calculator</button>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 items-center">
          {session ? (
            <>
              <Link href={"/"}>
                <button className="hover:underline text-slate-100">Home</button>
              </Link>
              <Link href={"/feature"}>
                <button className="hover:underline text-slate-100">Feature</button>
              </Link>
            

              <Button
                onClick={signingOut}
                className="font-bold bg-slate-100 text-black"
                variant="outline"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button
                className="bg-slate-100 text-black"
                variant="outline"
              >
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-gray-800 p-4 rounded-lg">
          {session ? (
            <>
              <Link href={"/"}>
                <button className="text-left text-slate-100 hover:underline">
                  Home
                </button>
              </Link>
              <Link href={"/feature"}>
                <button className="text-left text-slate-100 hover:underline">
                  Feature
                </button>
              </Link>
              
              <Button
                onClick={signingOut}
                className="w-full font-bold bg-slate-100 text-black"
                variant="outline"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button
                className="w-full bg-slate-100 text-black"
                variant="outline"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
