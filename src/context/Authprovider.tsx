'use client'
import { SessionProvider } from "next-auth/react";
import React from "react";


export const AuthProvider=async({children}:{children:React.ReactNode})=>{
return (
    <SessionProvider>
    {children}
    </SessionProvider>
)
}