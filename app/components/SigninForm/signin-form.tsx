"use client";

import { useState, useActionState } from "react";
import { loginUserAction } from "@/data/actions/auth-actions";
import { ZodErrors } from "@/components/custom/zod-errors";
import { ServerErrors } from "../custom/server-errors";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import styles from "./signin-form.module.css";

const INITIAL_STATE = {
  data: null,
};

export function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formState, formAction] = useActionState(
    loginUserAction,
    INITIAL_STATE
  );

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.form_container}>
      <form action={formAction} className={styles.register_form}>
        <input
          className={`${styles.form_field} ${styles.input}`}
          type={"email"}
          name="email"
          placeholder={"Email"}
        />
        <ZodErrors error={formState?.zodErrors?.email} />

        <div className={styles.passwordContainer}>
          <input
            className={`${styles.form_field} ${styles.input} ${styles.passwordInput}`}
            type={showPassword ? "text" : "password"}
            name="password"
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
        <button
          className={`${styles.form_field} ${styles.button}`}
          type="submit"
        >
          Вход
        </button>
      </form>
      <ServerErrors error={formState?.serverErrors} />
    </div>
  );
}
