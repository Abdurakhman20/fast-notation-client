"use client";

import { useState, useActionState } from "react";
import { registerUserAction } from "@/data/actions/auth-actions";
import { ZodErrors } from "@/components/custom/zod-errors";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import styles from "./signup-form.module.css";
import { ServerErrors } from "../custom/server-errors";

const INITIAL_STATE = {
  data: null,
};

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [formState, formAction] = useActionState(
    registerUserAction,
    INITIAL_STATE
  );

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowPasswordAgain = () => {
    setShowPasswordAgain((prev) => !prev);
  };

  return (
    <div className={styles.form_container}>
      <form action={formAction} className={styles.register_form}>
        <input
          className={`${styles.form_field} ${styles.input}`}
          name="email"
          type={"email"}
          placeholder={"Email"}
        />
        <ZodErrors error={formState?.zodErrors?.email} />
        <div className={styles.passwordContainer}>
          <input
            className={`${styles.form_field} ${styles.input} ${styles.passwordInput}`}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={"Пароль"}
          />
          <ZodErrors error={formState?.zodErrors?.password} />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={toggleShowPassword}
          >
            {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
          </button>
        </div>
        <div className={styles.passwordContainer}>
          <input
            className={`${styles.form_field} ${styles.input} ${styles.passwordInput}`}
            name="passwordRepeat"
            type={showPasswordAgain ? "text" : "password"}
            placeholder={"Повторите пароль"}
          />
          <ZodErrors error={formState?.zodErrors?.passwordRepeat} />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={toggleShowPasswordAgain}
          >
            {showPasswordAgain ? (
              <IoMdEyeOff size={20} />
            ) : (
              <IoMdEye size={20} />
            )}
          </button>
        </div>
        <button
          className={`${styles.form_field} ${styles.button}`}
          type="submit"
        >
          Регистрация
        </button>
      </form>
      <ServerErrors error={formState?.serverErrors} />
    </div>
  );
}
