"use client";

import { useState, useActionState } from "react";
import { registerUserAction } from "@/features/auth/actions/auth-actions";
import { ZodErrors } from "@/shared/components/custom/zod-errors";
import { ServerErrors } from "@/shared/components/custom/server-errors";
import { Button, Input, Card } from "@/shared/components/ui";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const INITIAL_STATE = {
  data: null,
};

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [formState, formAction] = useActionState(registerUserAction, INITIAL_STATE);

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const toggleShowPasswordAgain = () => {
    setShowPasswordAgain(prev => !prev);
  };

  return (
    <Card className="w-[480px] p-4 rounded-xl">
      <form action={formAction} className="flex flex-col gap-4 content-evenly p-2.5">
        <Input placeholder="Email" name="email" />
        <ZodErrors error={formState?.zodErrors?.email} />
        <Input placeholder="Имя" name="firstname" type="text" />
        <ZodErrors error={formState?.zodErrors?.firstname} />
        <Input placeholder="Фамилия" name="lastname" type="text" />
        <ZodErrors error={formState?.zodErrors?.lastname} />
        <Input placeholder="Имя пользователя" name="username" type="text" />
        <ZodErrors error={formState?.zodErrors?.username} />
        <div className="relative">
          <Input placeholder="Пароль" name="password" type={showPassword ? "text" : "password"} />
          <ZodErrors error={formState?.zodErrors?.password} />
          <button
            type="button"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer outline-none p-0 m-0"
            onClick={toggleShowPassword}
          >
            {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
          </button>
        </div>
        <div className="relative">
          <Input placeholder="Повторите пароль" name="passwordRepeat" type={showPassword ? "text" : "password"} />
          <ZodErrors error={formState?.zodErrors?.passwordRepeat} />
          <button
            type="button"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer outline-none p-0 m-0"
            onClick={toggleShowPasswordAgain}
          >
            {showPasswordAgain ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
          </button>
        </div>
        <Button type="submit" variant="default">
          Регистрация
        </Button>
      </form>
      <ServerErrors error={formState?.serverErrors} />
      <div className="text-center pt-2.5">
        Уже зарегистрированы? &nbsp;
        <a href="/signin" className="text-blue-500 visited:text-fuchsia-500">
          Войти
        </a>
      </div>
    </Card>
  );
}
