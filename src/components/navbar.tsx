'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

function Navbar() {
  const { data: session } = useSession();
  // const user : User = session?.user;
  const router=useRouter()
  const signingOut=()=>{
    try {
      signOut()
      router.replace('/login')
    } catch (error) {
      console.log("Something went wrong while signing out")
    }
  }

  return (
    <nav className="p-4 md:p-6 shadow-md  text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        <Link href={'/home'}>
        <button className="text-xl  font-bold mb-4 md:mb-0">Roi Calculator</button>
        </Link>
        {session ? (
          < >
            
          <div className='flex justify-center items-center gap-[50px]'>
             <Link href={'/feature'}> 
            <button  className=" md:w-auto hover:underline text-slate-100 " >
              Feature
            </button>
             </Link> 
            <button  className="w-full md:w-auto text-slate-100 " >
              Pricing
            </button>
            <button  className="w-full md:w-auto text-slate-100 " >
              Support
            </button>
            <Button onClick={signingOut} className="w-full font-bold md:w-auto bg-slate-100 text-black" variant='outline'>
              Logout
            </Button>
          </div>
          </>
        ) : (
          <Link href="/login">
            <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;