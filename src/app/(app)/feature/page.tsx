"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {Loader2}  from 'lucide-react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from "@/components/ui/input"
import * as z from 'zod'
import {useForm} from 'react-hook-form'
import { roiSchema } from '@/schemas/roiform.schema';


export function FeatureForm() {
  const [isFormsubmitting,setisformsubmitting]=useState(false)

  const form=useForm<z.infer<typeof roiSchema>>({
    resolver:zodResolver(roiSchema),
    defaultValues:{
      devicename:"",
      defects:"",
      devicePrice:0
    }
  })
  const roiCaluclation=async()=>{
    try {
      setisformsubmitting(true)
      setisformsubmitting(false)

      // const response=await axios.post()

    } catch (error) {
      
    }
  }
  return (
 <div className='flex justify-center items-center min-h-screen '>
<div className='w-full max-w-md p-8 space-y-8 border-2  rounded-lg mb-22 shadow-md'>
<div className='text-center'>
<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl ">
            Roi Calculator
          </h1>
</div>
<Form {...form}>
  <form onSubmit={form.handleSubmit(roiCaluclation)}>
    <FormField
    name='devicename'
    control={form.control}
    render={({field})=>(
      <FormItem>
        <FormLabel className='font-bold mt-1'>Device Name</FormLabel>
          <Input
          {...field}
          />
      </FormItem>
    )}
    />
    <FormField
    name='defects'
    control={form.control}
    render={({field})=>(
      <FormItem>
        <FormLabel className='font-bold mt-3'>Defects</FormLabel>
        <Input
        {...field}
        />
      </FormItem>
    )}
    />
    <FormField
    name='devicePrice'
    control={form.control}
    render={({field})=>(

      <FormItem>
        <FormLabel className='font-bold mt-3'>Device price</FormLabel>
        <Input
        {...field}
        />
      </FormItem>
    )}
    />
    <div>
      <Button className='w-full mt-[3rem] bg-white px-2 py-1 text-black font-bold text-xl'   type='submit' disabled={isFormsubmitting}>
      {isFormsubmitting?(
      <>
      <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
      Please wait
      </>
    ):("Submit")}
      </Button>
    </div>
  </form>
</Form>
</div>
 </div>
  )
}

