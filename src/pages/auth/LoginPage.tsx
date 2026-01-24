import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import { clearAuthError, loginUser } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user) navigate("/app", { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    if (error) dispatch(clearAuthError());
  }, [email, password]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Welcome back</h1>
        <p className="text-sm text-muted">Log in to continue.</p>
      </div>

      <form className="space-y-3" onSubmit={handleLogin}>
        <div className="space-y-1">
          <label className="text-sm">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border bg-bg px-3 py-2 outline-none focus:ring-2 focus:ring-border"
            type="email"
            placeholder="you@mail.com"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm">Password</label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl border border-border bg-text px-3 py-2 text-bg font-medium hover:cursor-pointer disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="text-sm text-muted">
        New here?{" "}
        <Link className="text-text underline" to="/auth/register">
          Create account
        </Link>
      </p>
    </div>
  );
}
