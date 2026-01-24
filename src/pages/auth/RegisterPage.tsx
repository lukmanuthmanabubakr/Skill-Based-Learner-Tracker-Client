import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import { registerUser } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Create account</h1>
        <p className="text-sm text-muted">Start tracking your skills.</p>
      </div>

      <form className="space-y-3" onSubmit={handleRegister}>
        <div className="space-y-1">
          <label className="text-sm">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-border bg-bg px-3 py-2 outline-none focus:ring-2 focus:ring-border"
            placeholder="Legend"
          />
        </div>

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
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl border border-border bg-text px-3 py-2 text-bg font-medium hover:cursor-pointer disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-sm text-muted">
        Already have an account?{" "}
        <Link className="text-text underline" to="/auth/login">
          Log in
        </Link>
      </p>
    </div>
  );
}
