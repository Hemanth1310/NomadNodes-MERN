import { z } from 'zod';

// Defining Email rules 
const emailRules = z.string().email("Invalid email format").trim().toLowerCase()

// Define password rules ONCE so they are identical everywhere
const passwordRules = z.string()
    .min(8, "Please enter at least 8 characters")
    .regex(/[!@#$%^&*]/, "Please enter atleast one special charecter e.g. !@#$%^&*");

export const TAG_VALUES = ['View', 'Experience', 'Food'] as const
export const tagSchema = z.enum(TAG_VALUES)
export type Tag = z.infer<typeof tagSchema>
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

export const userDataSchema = z.object({
  id: z.string().uuid(),
  email: z.email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  imagePath: z.string(), // allows "" too
  isVerified: z.boolean(),
});

export type RegistrationData = z.infer<typeof registerSchema>

export const nodePostSchema = z.object({
  title:       z.string().min(1),
  coordinates: z.string().min(1),
  content:     z.string().min(1),
  visitDate:   z.string().date(),          // validates "YYYY-MM-DD" string
  tags:        z.string()                  // comes as JSON string e.g. '["View","Food"]'
                 .transform((val) => JSON.parse(val))
                 .pipe(z.array(tagSchema)),
})