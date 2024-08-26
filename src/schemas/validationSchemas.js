// src/hooks/validationSchemas.js
import { z } from 'zod';

export const zodSchemaForLogin = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const zodSchemaForSignup = zodSchemaForLogin.extend({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters long" })
    .refine((val, ctx) => val === ctx.parent.password, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
});
