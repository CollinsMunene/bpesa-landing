import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Download from "./pages/Download";
import NotFound from "./pages/NotFound";
import BpesaReserve from "./pages/BpesaReserve";
import { Web3Provider } from "./providers";
import TransactionFees from "./pages/TransactionFee";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Web3Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/download" element={<Download />} />
          <Route path="/transaction_bands" element={<TransactionFees />} />
          <Route path="/superagent/float" element={<BpesaReserve />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </Web3Provider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
