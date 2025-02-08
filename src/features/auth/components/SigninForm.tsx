"use client";

import { useState, useActionState } from "react";
import { loginUserAction } from "@/features/auth/actions/auth-actions";
import { ZodErrors } from "@/shared/components/custom/zod-errors";
import { ServerErrors } from "@/shared/components/custom/server-errors";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Button, Input, Card } from "@/shared/components/ui";

const INITIAL_STATE = {
  data: null,
};

export function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formState, formAction] = useActionState(loginUserAction, INITIAL_STATE);

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <Card className="w-[480px] p-4 rounded-xl">
      <form action={formAction} className="flex flex-col gap-4 content-evenly p-2.5">
        <Input placeholder="Email" name="email" />
        <ZodErrors error={formState?.zodErrors?.email} />
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
        <Button type="submit" variant="default">
          Вход
        </Button>
      </form>
      <ServerErrors error={formState?.serverErrors} />
      <div className="text-center pt-2.5">
        Нет аккаунта? &nbsp;
        <a href="/signup" className="text-blue-500 visited:text-fuchsia-500">
          Зарегистрироваться
        </a>
      </div>
    </Card>
  );
}
