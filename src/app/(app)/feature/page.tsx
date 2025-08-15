"use client"

import React from 'react'
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button"
import { useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function page() {
  return (
    <div >
       <div className="ml-[34rem] mt-[3rem] ">

       <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className='text-2xl'>Roi Calculator</CardTitle>
        <CardDescription>
          Enter the following to get best advice
        </CardDescription>
       
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Device name</Label>
              <Input
                id="devicename"
                type="text"
                placeholder="Iphone15"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Defects</Label>
                
              </div>
              <Input id="defects" type="text" placeholder='e.g:borken screen,bad battery' required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Price</Label>
                
              </div>
              <Input id="price" type="number" placeholder='e.g:222$' required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" variant={'outline'}>
          Submit
        </Button>
        
      </CardFooter>
    </Card>
     </div>
    </div>
  )
}

export default page
