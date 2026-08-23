import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`min-h-screen transition-all duration-300 ${
          collapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <Topbar setMobileOpen={setMobileOpen} />

        <main className="min-w-0">
          {children}
        </main>
      </div>

    </div>
  );
}

export default AppLayout;