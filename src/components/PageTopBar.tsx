import AnalyticsBadge from "./AnalyticsBadge";
import DarkModeToggle from "./DarkModeToggle";

export default function PageTopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-6">
      <div className="flex items-center justify-between">
        <AnalyticsBadge />
        <DarkModeToggle />
      </div>
    </div>
  );
}
