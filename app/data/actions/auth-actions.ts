"use server";

import { z } from "zod";
import { registerUserService, loginUserService } from "../services/auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const schemaRegister = z
  .object({
    email: z.string().email({
      message: "Не правильный формат почты",
    }),
    firstname: z.string().min(1).max(25, {
      message: "Длина имени должна быть от 1 до 25 символов",
    }),
    lastname: z.string().min(1).max(25, {
      message: "Длина фамилии должна быть от 1 до 25 символов",
    }),
    username: z.string().min(1).max(25, {
      message: "Длина имени пользователя должна быть от 1 до 25 символов",
    }),
    password: z.string().min(4).max(25, {
      message: "Длина пароля должна быть от 4 до 25 символов",
    }),
    passwordRepeat: z.string().min(4).max(25, {
      message: "Длина пароля должна быть от 4 до 25 символов",
    }),
  })
  .refine(data => data.password === data.passwordRepeat, {
    message: "пароли должны совпадать",
    path: ["passwordRepeat"],
  });

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

const schemaLogin = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(4).max(25, {
    message: "Password must be between 4 and 25 characters",
  }),
});

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
