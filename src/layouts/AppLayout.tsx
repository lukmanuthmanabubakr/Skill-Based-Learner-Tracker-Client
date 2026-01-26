import { Outlet } from "react-router-dom";
import PageTopBar from "../components/PageTopBar";


export default function AppLayout() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <PageTopBar />

      <main className="mx-auto max-w-6xl px-4 pt-24 pb-10">
        <Outlet />
      </main>
    </div>
  );
}
