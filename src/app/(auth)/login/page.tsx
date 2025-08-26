"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AiOutlineGoogle } from 'react-icons/ai';
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { apiResponse } from "@/types/apiResponse";
import { toast } from "sonner";
import { AxiosError } from "axios";
import Link from "next/link";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { loginInSchema } from "@/schemas/login.Schema";

export default function Loginpage() {
  const router = useRouter();
  
  const [isFormsubmitting, setisformsubmitting] = useState(false);

  const form = useForm<z.infer<typeof loginInSchema>>({
    resolver: zodResolver(loginInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const signingIn = async () => {
    const response = await signIn("google", { redirect: false });
    console.log(response);
  };

  const onlogin = async (data: z.infer<typeof loginInSchema>) => {
    try {
      setisformsubmitting(true);
      const response = await signIn("credentials",{redirect:false,identifier:data.identifier,password:data.password});
      console.log(response)
      if (response?.status) {
        if(response.status>200){
          console.log("response",response)
          setisformsubmitting(false);
            toast("Login Error", {
              description: response.error
            });
        }
          else{
            setisformsubmitting(false);
            toast("Login Successfull", {
              description: "User logged in successfully",
            });
            router.replace(`/home`);
          }

        
      }
    } catch (error) {
      console.log("something went wrong while logging in", error);
      const axiosError=error as AxiosError<apiResponse>
      const errorMessage=axiosError.response?.data.message
      toast("Error",{richColors:true,description:errorMessage})
      setisformsubmitting(false)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8 border-2  rounded-lg mb-22 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl ">
            Login In
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onlogin)}>
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold mt-1">Email</FormLabel>
                  <Input {...field} />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold mt-3">Password</FormLabel>
                  <Input {...field} type="password" />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div>
              <Button
                className="w-full mt-[3rem] bg-white px-2 py-1 text-black font-bold text-xl"
                type="submit"
                disabled={isFormsubmitting}
              >
                {isFormsubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              {/* <Button
                onClick={signingIn}
                variant="outline"
                className="w-full mt-[2rem]"
              >
                <AiOutlineGoogle />
                Login with Google
              </Button> */}
            </div>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not have a account?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

