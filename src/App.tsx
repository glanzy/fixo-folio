import { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { LoadingScreen } from "./components/LoadingScreen";
import { supabase } from "./integrations/supabase/client";
import Index from "./pages/Index";
import TrackService from "./pages/TrackService";
import AboutUs from "./pages/AboutUs";
import BookRepair from "./pages/BookRepair";
import HowItWorks from "./pages/HowItWorks";
import Services from "./pages/Services";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth", { state: { from: location.pathname } });
      }
    };

    checkAuth();
  }, [navigate, location]);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/track-service" element={<TrackService />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route
              path="/book-repair"
              element={
                <ProtectedRoute>
                  <BookRepair />
                </ProtectedRoute>
              }
            />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;