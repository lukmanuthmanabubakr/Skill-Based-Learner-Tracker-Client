import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";

export default function RegisterPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Create account</h1>
        <p className="text-sm text-muted">Start tracking your skills.</p>
      </div>

      <form className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm">Name</label>
          <input
            className="w-full rounded-xl border border-border bg-bg px-3 py-2 outline-none focus:ring-2 focus:ring-border"
            placeholder="Legend"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm">Email</label>
          <input
            className="w-full rounded-xl border border-border bg-bg px-3 py-2 outline-none focus:ring-2 focus:ring-border"
            type="email"
            placeholder="you@mail.com"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm">Password</label>
          <PasswordInput />
        </div>

        <button
          type="button"
          className="w-full rounded-xl border border-border bg-text px-3 py-2 text-bg font-medium hover:cursor-pointer"
        >
          Create account
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
