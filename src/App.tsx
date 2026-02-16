import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BuildTrackProvider } from "@/contexts/BuildTrackContext";
import { ResumeProvider } from "@/contexts/ResumeContext";
import HomePage from "./pages/HomePage";
import BuilderPage from "./pages/BuilderPage";
import PreviewPage from "./pages/PreviewPage";
import ProofPageResume from "./pages/ProofPageResume";
import NotFound from "./pages/NotFound";
import BuildStepPage from "./pages/rb/BuildStepPage";
import ProofPage from "./pages/rb/ProofPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ResumeProvider>
          <BuildTrackProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/builder" element={<BuilderPage />} />
              <Route path="/preview" element={<PreviewPage />} />
              <Route path="/proof" element={<ProofPageResume />} />
              <Route path="/rb/proof" element={<ProofPage />} />
              <Route path="/rb/:slug" element={<BuildStepPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BuildTrackProvider>
        </ResumeProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
