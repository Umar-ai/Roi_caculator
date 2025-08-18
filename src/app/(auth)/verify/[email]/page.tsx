'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { apiResponse } from '@/types/apiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { verifyCodeSchema } from '@/schemas/verfiyandForgotOTP.schema';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function VerifyAccount() {
  const [isFormsubmitting,setisformsubmitting]=useState(false)
  const router = useRouter();
  const params = useParams<{ email:string}>();
  const form = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
  });

  const onSubmit = async (data: z.infer<typeof verifyCodeSchema>) => {
    try {
      setisformsubmitting(true)
      const response = await axios.post(`/api/verify-code`, {
        Email: params.email,
        verifyCode: data.code,
      });
      if(response){
        setisformsubmitting(false)
      }

      toast(
         'Success',{
        description: response.data.message,
      });
      

      router.replace('/login');
    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>;
      toast('Verification Failed',{
        description:
          axiosError.response?.data.message ??
          'An error occurred. Please try again.'
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8 bg-black border-2  rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full bg-white text-black font-bold ' type="submit">
              {isFormsubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Verify"
                )}
              

            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}