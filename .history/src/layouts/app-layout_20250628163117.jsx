import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => (
  <div className="flex flex-col min-h-screen bg-[#0a0e1a] text-white">
    {/* Header */}
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
      <div className="flex items-center gap-2">
        <img src="/logo1.png" alt="ZapLink Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
        <span className="text-xl sm:text-2xl font-bold">ZapLink</span>
      </div>
      <Header />
    </header>

    {/* Main content */}
    <main className="flex-1 container mx-auto px-4 py-6">
      <Outlet />
    </main>

    {/* Footer */}
    <footer className="p-6 bg-[#0c101c] text-white text-sm text-center flex flex-col items-center gap-2 border-t border-white/10">
      <img src="/logo.png" alt="ZapLink Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
      <span>© 2025 ZapLink • All rights reserved.</span>
    </footer>
  </div>
);

export default AppLayout;
import Header from "@/components/header";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">
        © 2025 ZapLink • All rights reserved.
      </div>
    </div>
  );
};

export default AppLayout;