import React from 'react'
import { Spotlight } from './ui/Spotlight'
import Link from "next/link"
// import { Button } from "./ui/moving-border";

function HeroSection() {
  return (
    <div
    className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0"
    >
        <Spotlight
        className="-top-20 left-0  md:left-60 md:-top-20"
        fill="white"
      />
        <div className="p-4 relative z-10 w-full text-center" >
            <h1
            className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
            >Future of Refurbishment</h1>
            <p
            className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto"
            >Dive in to our app that helps refurbishers make a quick, data-driven decision on whether to sell an item in used condition or invest in refurbishing for a potentially higher return.</p>
            <div className="mt-4">
                <Link href={"/feature"}>
                    <button
                    className="  text-white  px-4 py-2 mt-2 text-xl font-bold border-2 rounded-xl  border-white "
                    >
                    Explore Feature
                    </button>
                </Link>
            </div>
        </div>
        
        </div>
  )
}

export default HeroSection
