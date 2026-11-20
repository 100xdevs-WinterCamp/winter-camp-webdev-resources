// src/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { api } from "../lib/api";
import { useAuthStore, } from "../store/useAuthStore";


async function submitAuthForm(path: string, form: FormData) {
  const { data } = await api.post(path, Object.fromEntries(form));
  return data.user;
}

export function useSignup() {
  const setUser = useAuthStore(state => state.setUser);

  return useMutation({
    mutationFn: (form: FormData) => submitAuthForm("/auth/signup", form),
    onSuccess: setUser,
  });
}

export function useSignin() {
  const setUser = useAuthStore(state => state.setUser);

  return useMutation({
    mutationFn: (form: FormData) => submitAuthForm("/auth/signin", form),
    onSuccess: setUser,
  });
}

export function useLogout() {
  const setUser = useAuthStore(state => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => api.post("/auth/logout"),
    onSuccess: () => {
      navigate("/", { replace: true });
      setUser(null);
    },
  });
}