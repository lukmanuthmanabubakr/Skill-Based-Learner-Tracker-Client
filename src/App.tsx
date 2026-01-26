import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/App/DashboardPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" replace />} />

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}
