import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Contests from "./pages/Contests";
import {
  ProblemsPage,
  SubmissionsPage,
  UsersPage,
  MySubmissionsPage,
} from "./pages/Placeholder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes with Layout */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Index />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/contests"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Contests />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/problems"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <ProblemsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/submissions"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <SubmissionsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Layout>
                    <UsersPage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-submissions"
              element={
                <ProtectedRoute>
                  <Layout>
                    <MySubmissionsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
