import * as z from 'zod'



export const loginInSchema=z.object({
    identifier:z.string().email({message:"Invalid email address"}),
    password:z.string()
})