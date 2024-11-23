"use client";

import { useState, useActionState } from "react";
import { loginUserAction } from "@/data/actions/auth-actions";
import { ZodErrors } from "@/components/custom/zod-errors";
import { ServerErrors } from "../custom/server-errors";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import cn from "classnames";
import styles from "./signin-form.module.css";

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
    <div className={styles.form_container}>
      <form action={formAction} className={styles.register_form}>
        <input className={cn(styles.form_field, styles.input)} type={"email"} name="email" placeholder={"Email"} />
        <ZodErrors error={formState?.zodErrors?.email} />

        <div className={styles.password_container}>
          <input
            className={cn(styles.form_field, styles.input, styles.password_input)}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder={"Пароль"}
          />
          <ZodErrors error={formState?.zodErrors?.password} />
          <button type="button" className={styles.toggle_password} onClick={toggleShowPassword}>
            {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
          </button>
        </div>
        <button className={cn(styles.form_field, styles.button)} type="submit">
          Вход
        </button>
      </form>
      <ServerErrors error={formState?.serverErrors} />
      <div className={styles.to_signup}>
        Нет аккаунта? &nbsp;
        <a href="/signup">Зарегистрироваться</a>
      </div>
    </div>
  );
}
