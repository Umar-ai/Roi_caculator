"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { roiSchema } from "@/schemas/roiform.schema";
import axios from "axios";
import { toast } from "sonner";

export default function FeatureForm() {
  const [isFormsubmitting, setisformsubmitting] = useState(false);
  const router = useRouter();
  const param = useParams();
  const form = useForm<z.infer<typeof roiSchema>>({
    resolver: zodResolver(roiSchema),
    defaultValues: {
      Device_Model: "",
      Defects: "",
      device_Price: "",
    },
  });
  useEffect(() => {
    if (param.problem) {
      toast("Error",{richColors:true,description:"Something went wrong try again"})
    }
  }, []);
  const roiCaluclation = async (data: z.infer<typeof roiSchema>) => {
    try {
      setisformsubmitting(true);
      const response = await axios.post(
        `https://jadoon.xyz/webhook/1ffcb5ca-9ef2-4d2b-962e-2a0d1b5da4f7`,
        data
      );
      if (response) {
        const htmlResponse = response.data;
        const encodedHtml = encodeURIComponent(htmlResponse);
        router.replace(`/feature-output?html=${encodedHtml}`);
      }
      setisformsubmitting(false);
    } catch (error) {
      console.log(
        "Something went wrong while connecting to n8n in feature page",
        error
      );
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8 border-2  rounded-lg mb-22 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl ">
            Roi Calculator
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(roiCaluclation)}>
            <FormField
              name="Device_Model"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold mt-1">Device Name</FormLabel>
                  <Input {...field} />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              name="Defects"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold mt-3">Defects</FormLabel>
                  <Input {...field} />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              name="device_Price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold mt-3">Device price</FormLabel>
                  <Input {...field} />
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
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
