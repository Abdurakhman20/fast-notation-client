"use client";

import { useState, useActionState } from "react";
import { registerUserAction } from "@/features/auth/actions/auth-actions";
import { ZodErrors } from "../custom/zod-errors";
import { ServerErrors } from "../custom/server-errors";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import cn from "classnames";
import styles from "./signup-form.module.css";

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
    <div className={styles.form_container}>
      <form action={formAction} className={styles.register_form}>
        <input className={cn(styles.form_field, styles.input)} name="email" type={"email"} placeholder={"Email"} />
        <ZodErrors error={formState?.zodErrors?.email} />
        <input className={cn(styles.form_field, styles.input)} name="firstname" type={"text"} placeholder={"Имя"} />
        <ZodErrors error={formState?.zodErrors?.firstname} />
        <input className={cn(styles.form_field, styles.input)} name="lastname" type={"text"} placeholder={"Фамилия"} />
        <ZodErrors error={formState?.zodErrors?.lastname} />
        <input className={cn(styles.form_field, styles.input)} name="username" type={"text"} placeholder={"Имя пользователя"} />
        <ZodErrors error={formState?.zodErrors?.username} />
        <div className={styles.password_container}>
          <input
            className={cn(styles.form_field, styles.input, styles.password_input)}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={"Пароль"}
          />
          <ZodErrors error={formState?.zodErrors?.password} />
          <button type="button" className={styles.toggle_password} onClick={toggleShowPassword}>
            {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
          </button>
        </div>
        <div className={styles.password_container}>
          <input
            className={cn(styles.form_field, styles.input, styles.password_input)}
            name="passwordRepeat"
            type={showPasswordAgain ? "text" : "password"}
            placeholder={"Повторите пароль"}
          />
          <ZodErrors error={formState?.zodErrors?.passwordRepeat} />
          <button type="button" className={styles.toggle_password} onClick={toggleShowPasswordAgain}>
            {showPasswordAgain ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
          </button>
        </div>
        <button className={cn(styles.form_field, styles.button)} type="submit">
          Регистрация
        </button>
      </form>
      <ServerErrors error={formState?.serverErrors} />
      <div className={styles.to_signin}>
        Уже зарегистрированы? &nbsp;
        <a href="/signin">Войти</a>
      </div>
    </div>
  );
}
