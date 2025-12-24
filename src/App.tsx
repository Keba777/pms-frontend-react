import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState, useRef } from "react";
import { useSettingsStore } from "@/store/settingsStore";
import { EtLocalizationProvider } from "habesha-datepicker";
import AppRoutes from "@/Routes";
import Footer from "@/components/layout/Footer";

const queryClient = new QueryClient();

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { user, expiresAt, logout, _hasHydrated } = useAuthStore();
  const { useEthiopianDate } = useSettingsStore();
  const [isLoading, setIsLoading] = useState(true);
  const logoutTimer = useRef<number | null>(null);

  const publicPaths = ["/login", "/reset-password"];

  // Register AG Grid modules globally - done in main.tsx

  useEffect(() => {
    if (!_hasHydrated) return;

    if (user && (!expiresAt || Date.now() >= expiresAt)) {
      logout();
      navigate("/login");
      return;
    }

    // If user exists and expiresAt is in the future, schedule a timeout
    if (user && expiresAt) {
      const msUntilExpiry = expiresAt - Date.now();
      logoutTimer.current = window.setTimeout(() => {
        logout();
        navigate("/login");
      }, msUntilExpiry);
    }

    return () => {
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
        logoutTimer.current = null;
      }
    };
  }, [_hasHydrated, user, expiresAt, logout, navigate]);

  // Auth redirection & loading logic
  useEffect(() => {
    if (!_hasHydrated) return;

    // Redirect unauthenticated users to login, except for public paths
    if (!user && !publicPaths.includes(pathname)) {
      navigate("/login");
    }
    else if (user && publicPaths.includes(pathname)) {
      // If authenticated, redirect away from public paths to dashboard
      navigate("/");
    }

    if (isLoading) {
      setIsLoading(false);
    }
  }, [user, pathname, navigate, _hasHydrated, isLoading]);

  if (!_hasHydrated || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  const localType = useEthiopianDate ? "EC" : "GC";

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <EtLocalizationProvider locale={localType}>
        <AppRoutes />
        {!publicPaths.includes(pathname) && <Footer />}
      </EtLocalizationProvider>
    </QueryClientProvider>
  );
}
