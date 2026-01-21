import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DomainProvider } from "@/contexts/DomainContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { StaffProvider } from "@/contexts/StaffContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Super Admin
import SuperAdminLogin from "./pages/superadmin/SuperAdminLogin";
import SuperAdminLayout from "./components/superadmin/SuperAdminLayout";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import SchoolManagement from "./pages/superadmin/SchoolManagement";
import SchoolAccountsManagement from "./pages/superadmin/SchoolAccountsManagement";
import DomainManagement from "./pages/superadmin/DomainManagement";
import StatisticsPage from "./pages/superadmin/StatisticsPage";
import SettingsPage from "./pages/superadmin/SettingsPage";
import SchoolRegistrationsPage from "./pages/superadmin/SchoolRegistrationsPage";

// School Admin
import SchoolAdminLayout from "./components/schooladmin/SchoolAdminLayout";
import SchoolAdminDashboard from "./pages/schooladmin/SchoolAdminDashboard";
import StaffManagement from "./pages/schooladmin/StaffManagement";
import StudentManagement from "./pages/schooladmin/StudentManagement";
import ClassManagement from "./pages/schooladmin/ClassManagement";
import OperatorManagement from "./pages/schooladmin/OperatorManagement";
import ContentManagement from "./pages/schooladmin/ContentManagement";
import GalleryManagement from "./pages/schooladmin/GalleryManagement";
import SchoolSettings from "./pages/schooladmin/SchoolSettings";

// Operator
import OperatorLayout from "./components/operator/OperatorLayout";
import OperatorDashboard from "./pages/operator/OperatorDashboard";
import OperatorNews from "./pages/operator/OperatorNews";
import OperatorGallery from "./pages/operator/OperatorGallery";
import OperatorPages from "./pages/operator/OperatorPages";

// School Login
import SchoolLogin from "./pages/school/SchoolLogin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <DomainProvider>
          <StaffProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/domain-pusat/login" element={<SuperAdminLogin />} />
                <Route path="/school-login" element={<SchoolLogin />} />
                
                {/* Super Admin Routes - sesuai prompt: /domain-pusat/admin */}
                <Route path="/domain-pusat/admin" element={<SuperAdminLayout />}>
                  <Route index element={<SuperAdminDashboard />} />
                  <Route path="schools" element={<SchoolManagement />} />
                  <Route path="registrations" element={<SchoolRegistrationsPage />} />
                  <Route path="accounts" element={<SchoolAccountsManagement />} />
                  <Route path="domains" element={<DomainManagement />} />
                  <Route path="statistics" element={<StatisticsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>

                {/* School Admin Routes */}
                <Route path="/admin" element={<SchoolAdminLayout />}>
                  <Route index element={<SchoolAdminDashboard />} />
                  <Route path="staff" element={<StaffManagement />} />
                  <Route path="students" element={<StudentManagement />} />
                  <Route path="classes" element={<ClassManagement />} />
                  <Route path="operators" element={<OperatorManagement />} />
                  <Route path="content" element={<ContentManagement />} />
                  <Route path="gallery" element={<GalleryManagement />} />
                  <Route path="settings" element={<SchoolSettings />} />
                </Route>

                {/* Operator Routes */}
                <Route path="/operator" element={<OperatorLayout />}>
                  <Route index element={<OperatorDashboard />} />
                  <Route path="news" element={<OperatorNews />} />
                  <Route path="gallery" element={<OperatorGallery />} />
                  <Route path="pages" element={<OperatorPages />} />
                </Route>
                
                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </StaffProvider>
        </DomainProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
