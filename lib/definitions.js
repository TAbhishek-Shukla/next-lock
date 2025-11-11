import * as z from 'zod'

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z
    .email({ message: 'Please enter a valid email.' })
    .trim(),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: 'Phone must be a valid 10-digit number.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter.' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character.' })
    .trim(),
})


export const LoginFormSchema = z.object({
  email: z
    .email({ message: 'Please enter a valid email.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter.' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character.' })
    .trim(),
})
