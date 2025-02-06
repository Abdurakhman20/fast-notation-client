import { z } from "zod";

export const schemaLogin = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(4).max(25, {
    message: "Password must be between 4 and 25 characters",
  }),
});

export type schemaLoginType = z.infer<typeof schemaLogin>;
