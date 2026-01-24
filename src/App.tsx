import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";


export default function App() {
  return (
    <Routes>
      {/* First screen is always auth */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Later: protected app routes */}
      {/* <Route path="/app" element={<AppLayout />}> ... </Route> */}

      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}
