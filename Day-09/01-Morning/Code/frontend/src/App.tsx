// src/App.tsx
import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router";
import PageLayout from "./components/PageLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Stocks from "./pages/Stocks";
import { api } from "./lib/api";
import { useAuthStore } from "./store/useAuthStore";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSession } from "./hooks/useSession";

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter useTransitions={false}>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stocks"
            element={
              <ProtectedRoute>
                <Stocks />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}