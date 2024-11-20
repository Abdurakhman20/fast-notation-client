"use server";

import { z } from "zod";
import { registerUserService } from "../services/auth-service";
import { redirect } from "next/navigation";

const schemaRegister = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(4).max(25, {
      message: "Password must be between 4 and 25 characters",
    }),
    passwordRepeat: z.string().min(4).max(25, {
      message: "Password must be between 4 and 25 characters",
    }),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords must match",
    path: ["passwordRepeat"],
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    passwordRepeat: formData.get("passwordRepeat"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      serverErrors: null,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const responseData = await registerUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      serverErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      serverErrors: responseData,
      zodErrors: null,
      message: "Failed to Register.",
    };
  }

  try {
    localStorage.setItem("currentUser", JSON.stringify(responseData));
  } catch (error) {
    console.error("Failed to save user data to localStorage:", error);
  }

  redirect("/");
}
