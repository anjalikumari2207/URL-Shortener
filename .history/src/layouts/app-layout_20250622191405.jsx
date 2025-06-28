// AppLayout.jsx
import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b1120] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-[#0f172a]">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="ZapLink Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-2xl font-bold text-white">ZapLink</span>
        </div>
        <Header />
      </header>

      {/* Main */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="p-6 bg-[#0f172a] text-white text-sm text-center flex flex-col items-center gap-2">
        <img src="/logo.png" alt="ZapLink Logo" className="w-8 h-8 object-contain" />
        <span>© 2025 Anjali Kumari • All rights reserved.</span>
      </footer>
    </div>
  );
};

export default AppLayout;
