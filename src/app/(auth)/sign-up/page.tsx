"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { apiResponse } from "@/types/apiResponse";
import axios from "axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import Link from "next/link";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "@/schemas/signup.schema";

function page() {
  const router = useRouter();
  
  const [isFormsubmitting, setisformsubmitting] = useState(false);
  const [isFormsubmitted, setisformsubmitted] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username:"",
      password: ""
    },
  });

  const signingUp = async () => {
    const response = await signIn("google", { redirect: false });
    console.log(response);
  };

  const onlogin = async (data: z.infer<typeof signupSchema>) => {
    try {
      setisformsubmitting(true);
      const response = await axios.post("/api/credentialsSignup", data );
      if (response) {
        setisformsubmitting(false);
        setisformsubmitted(true);
        toast("SignUp Successfull", {
          description: "User SignedUp Successfully",
        });
        router.replace("/login");
      }
    } catch (error) {
      console.log("something went wrong while logging in", error);
      const axiosError=error as AxiosError<apiResponse>
      let errorMessage=axiosError.response?.data.message
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
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold mt-1">Email</FormLabel>
                  <Input {...field} />
                </FormItem>
              )}
            />
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold mt-1">Username</FormLabel>
                  <Input {...field} />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold mt-3">Password</FormLabel>
                  <Input {...field} />
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
                  "SignUp"
                )}
              </Button>
              <Button
                onClick={signingUp}
                variant="outline"
                className="w-full mt-[2rem]"
              >
                Signup  with Google
              </Button>
            </div>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
             Have a account?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-800">
              Login In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
