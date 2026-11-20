// src/components/AuthForm.tsx
import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router";
import { api } from "../lib/api";
import { useAuthStore } from "../store/useAuthStore";
import { useSignin, useSignup } from "@/hooks/useAuth";
import { useSession } from "@/hooks/useSession";

type AuthFormProps = {
  mode: "login" | "signup";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const isSignup = mode === "signup";
  const signup = useSignup();
  const signin = useSignin();
  const { user, error, isPending } = useSession();

  const auth = isSignup ? signup : signin;

  const location = useLocation();

  const destination = location.state?.from ?? "/profile";

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    auth.mutate(form);
  }


  if (isPending) return <p className="text-zinc-400">Checking session…</p>;
  if (user) return <Navigate to={destination} replace />;

  return (
    <section className="panel mx-auto max-w-md">
      <h1 className="page-title">
        {isSignup ? "Create an account" : "Log in"}
      </h1>

      <form className="mt-7 grid gap-5" onSubmit={handleSubmit}>
        {isSignup && (
          <label className="field">
            Username
            <input
              name="username"
              autoComplete="username"
              minLength={2}
              maxLength={30}
              required
            />
          </label>
        )}

        <label className="field">
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>

        <label className="field">
          Password
          <input
            name="password"
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            minLength={8}
            maxLength={72}
            required
          />
        </label>

        {auth.isError && <p role="alert" className="error">{error?.message}</p>}

        <button type="submit" className="btn-primary" disabled={auth.isPending}>
          {auth.isPending ? "Please wait…" : isSignup ? "Create account" : "Log in"}
        </button>
      </form>

      <p className="mt-5 text-sm text-zinc-400">
        {isSignup ? "Already have an account? " : "New to Exchange? "}
        <Link className="text-zinc-100 underline" to={isSignup ? "/login" : "/signup"}>
          {isSignup ? "Log in" : "Sign up"}
        </Link>
      </p>
    </section>
  );
}