"use client";

import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import styles from "./signup-form.module.css";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowPasswordAgain = () => {
    setShowPasswordAgain((prev) => !prev);
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
            type={showPassword ? "text" : "password"}
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
        <div className={styles.passwordContainer}>
          <input
            className={`${styles.form_field} ${styles.input} ${styles.passwordInput}`}
            type={showPasswordAgain ? "text" : "password"}
            placeholder={"Повторите пароль"}
          />
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
    </div>
  );
}
