import { z } from "zod";

export const schemaRegister = z
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

export type schemaRegisterType = z.infer<typeof schemaRegister>;
