"use client";

import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import styles from "./signin-form.module.css";

export function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.form_container}>
      <form className={styles.register_form}>
        <input
          className={`${styles.form_field} ${styles.input}`}
          type={"email"}
          placeholder={"Email"}
        />

        <div className={styles.passwordContainer}>
          <input
            className={`${styles.form_field} ${styles.input} ${styles.passwordInput}`}
            type={showPassword ? "text" : "password"} // Меняем тип на text или password
            placeholder={"Пароль"}
          />
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
    </div>
  );
}
