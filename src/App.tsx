import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import RoleSelection from "@/pages/RoleSelection";
import Home from "@/pages/Home";
import FoodCatalog from "@/pages/FoodCatalog";
import Cart from "@/pages/Cart";
import Wallet from "@/pages/Wallet";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  if (!user?.role) {
    return (
      <Routes>
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="*" element={<Navigate to="/role-selection" />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food-catalog" element={<FoodCatalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/role-selection" element={<Navigate to="/" />} />
        {/* Placeholder routes - will be implemented */}
        <Route path="/food-detail/:id" element={<div className="p-8 text-center">Food Detail - Coming Soon</div>} />
        <Route path="/checkout" element={<div className="p-8 text-center">Checkout - Coming Soon</div>} />
        <Route path="/orders" element={<div className="p-8 text-center">Orders - Coming Soon</div>} />
        <Route path="/promos" element={<div className="p-8 text-center">Promos - Coming Soon</div>} />
        <Route path="/favorites" element={<div className="p-8 text-center">Favorites - Coming Soon</div>} />
        <Route path="/preorder" element={<div className="p-8 text-center">Preorder - Coming Soon</div>} />
        <Route path="/search" element={<div className="p-8 text-center">Search - Coming Soon</div>} />
        <Route path="/help" element={<div className="p-8 text-center">Help - Coming Soon</div>} />
        <Route path="/profile" element={<div className="p-8 text-center">Profile - Coming Soon</div>} />
        <Route path="/merchant/*" element={<div className="p-8 text-center">Merchant Dashboard - Coming Soon</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
