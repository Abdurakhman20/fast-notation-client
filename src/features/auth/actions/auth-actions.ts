"use server";

import { registerUserService, loginUserService } from "@/features/auth/services/auth-service";
import { schemaRegister, schemaLogin } from "@/features/auth/schemes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const config = {
  maxAge: 60 * 60 * 24 * 1, // 1 day
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    email: formData.get("email"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    username: formData.get("username"),
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

  redirect("/signin");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      serverErrors: null,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const responseData = await loginUserService(validatedFields.data);

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

  const cookieStore = await cookies();
  cookieStore.set("access-token", responseData.accessToken, config);

  redirect("/");
}
