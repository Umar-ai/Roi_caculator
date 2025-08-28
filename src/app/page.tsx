"use client";

import React from "react";
import { useSession } from "next-auth/react";
import HeroSection from "@/components/HeroSection";
import { ClipLoader } from "react-spinners";

function Page() {
  const { data: session, status } = useSession();

  // Wait for the session to be loaded before rendering
  if (status === "loading") {
    return (
      <div className="text-center mt-[15rem]">
        <ClipLoader
          color="white"
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (status === "authenticated" && session?.user) {
    return (
      <div>
        <HeroSection />
      </div>
    );
  }

  // Handle unauthenticated state if needed
  return <p>Access Denied</p>;
}

export default Page;
