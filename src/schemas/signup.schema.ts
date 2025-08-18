import * as z from 'zod'


const usernameValidation=z.string().min(6,"usernmae must be atleast 6 characters").max(20,"username must be no more than 20 characters").regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters')

export const signupSchema=z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string()
        .min(6,"password must be minimum 6 characters")
        .max(20,"password must not more than 20 characters")
        .regex(/.*[0-9].*/, "Password must contain at least one number")
        .regex(/.*[@!#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*/, "Password must contain at least one special character")
        .regex(/.*[A-Z].*/, "Password must contain at least one capital letter")
        .regex(/.*[a-zA-Z].*/, "Password must contain at least one character")
})