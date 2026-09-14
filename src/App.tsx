import { useState } from "react";
import Sidebar, { type PageKey } from "./components/Sidebar";
import TitleBar from "./components/TitleBar";
import Dashboard from "./components/Dashboard";
import ProcessList from "./components/ProcessList";
import SystemInfo from "./components/SystemInfo";
import DriverPanel from "./components/DriverPanel";
import RepairPanel from "./components/RepairPanel";
import ActivityLog from "./components/ActivityLog";

export default function App() {
  const [page, setPage] = useState<PageKey>("dashboard");

  const render = () => {
    switch (page) {
      case "dashboard": return <Dashboard onNavigate={setPage} />;
      case "processes": return <ProcessList />;
      case "system":    return <SystemInfo />;
      case "drivers":   return <DriverPanel />;
      case "repair":    return <RepairPanel />;
      case "activity":  return <ActivityLog />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <TitleBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar current={page} onChange={setPage} />
        <main className="flex-1 overflow-y-auto px-6 py-6 animate-fade-in" key={page}>
          {render()}
        </main>
      </div>
    </div>
  );
}