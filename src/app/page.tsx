"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
export default function Home() {
  const router=useRouter()
  const {data:session,status}=useSession()
  useEffect(()=>{
    if(status=='authenticated'){
      router.replace('/home')
    }
    else{
      router.replace('/sign-in')
    }
  },[session,router])
  const signingIn = async () => {
    const response = await signIn("google",{redirect:false});
    
  };
  return (
    <main>
      <button onClick={signingIn}>SignIn</button>
    </main>
  );
}
