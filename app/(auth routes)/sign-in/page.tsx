"use client";

import { useRouter } from "next/navigation";
import css from "./SignInPage.module.css";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { login, LoginRequest } from "@/lib/api/api";

const SignInPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;
      const res = await login(formValues);
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleLogin}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignInPage;
