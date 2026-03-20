import { tag } from '@prisma/client';
import { z } from 'zod';

// Defining Email rules 
const emailRules = z.string().email("Invalid email format").trim().toLowerCase()

// Define password rules ONCE so they are identical everywhere
const passwordRules = z.string()
    .min(8, "Please enter at least 8 characters")
    .regex(/[!@#$%^&*]/, "At least one special character needed");

export const loginDetailSchema = z.object({
    email: emailRules,
    password: passwordRules,
})

export const registerSchema = z.object({
    email:emailRules,
    firstName: z.string().min(1,"Name cannot be empty"),
    lastName: z.string().min(1,"Name cannot be empty"),
    password: passwordRules,
})

export const nodePostSchema = z.object({
  title:       z.string().min(1),
  coordinates: z.string().min(1),
  content:     z.string().min(1),
  visitDate:   z.string().date(),          // validates "YYYY-MM-DD" string
  tags:        z.string()                  // comes as JSON string e.g. '["View","Food"]'
                 .transform(val => JSON.parse(val) as tag[])
                 .pipe(z.array(z.nativeEnum(tag)))
})

export type NodePostInput = z.infer<typeof nodePostSchema>