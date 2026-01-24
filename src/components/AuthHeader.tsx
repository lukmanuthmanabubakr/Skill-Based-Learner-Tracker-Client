import AnalyticsBadge from "./AnalyticsBadge";
import DarkModeToggle from "./DarkModeToggle";

export default function AuthHeader() {
  return (
    <div className="w-full flex items-center justify-between mb-6">
      <AnalyticsBadge />
      <DarkModeToggle />
    </div>
  );
}
