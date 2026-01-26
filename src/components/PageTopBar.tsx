import { logout } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import AnalyticsBadge from "./AnalyticsBadge";
import DarkModeToggle from "./DarkModeToggle";


export default function PageTopBar() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((s) => s.auth);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card/80 px-4 py-3 shadow-sm backdrop-blur">
          <AnalyticsBadge />

          <div className="flex items-center gap-2">
            <DarkModeToggle />

            {/* show logout only if logged in */}
            {token && (
              <button
                onClick={() => dispatch(logout())}
                className="rounded-xl border border-border bg-card px-3 py-2 text-sm hover:bg-border/20 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
