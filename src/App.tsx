import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingScreen } from "./components/LoadingScreen";
import { BookServicePopup } from "./components/BookServicePopup";
import Index from "./pages/Index";
import TrackService from "./pages/TrackService";
import ServiceIdEntry from "./pages/ServiceIdEntry";
import AboutUs from "./pages/AboutUs";
import BookRepair from "./pages/BookRepair";
import Services from "./pages/Services";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <BookServicePopup />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/track-service-entry" element={<ServiceIdEntry />} />
            <Route path="/track-service" element={<TrackService />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/book-repair" element={<BookRepair />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;