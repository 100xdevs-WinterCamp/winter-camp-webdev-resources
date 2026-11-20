// src/components/ProtectedRoute.tsx
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useSession } from "@/hooks/useSession";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isPending, isError, error, refetch } = useSession();
  const location = useLocation();

  if (isPending) {
    return <p className="text-zinc-400">Loading session…</p>;
  }

  if (isError) {
    return (
      <div>
        <p role="alert" className="error">{error?.message}</p>
        <button className="btn-secondary mt-4" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}