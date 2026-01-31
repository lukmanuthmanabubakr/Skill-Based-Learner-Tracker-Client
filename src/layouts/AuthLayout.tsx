import { Outlet } from "react-router-dom";
import PageTopBar from "../components/PageTopBar";

export default function AuthLayout() {
  return (
    <div className="min-h-screen px-4">
      <PageTopBar />

      
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
