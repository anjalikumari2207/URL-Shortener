import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header with logo */}
      <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png" // make sure this file is in the public/ folder
            alt="ZapLink Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
          <span className="text-xl sm:text-2xl font-bold text-gray-800">ZapLink</span>
        </div>
        <Header />
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer with logo */}
      <footer className="p-6 bg-gray-900 text-white text-sm text-center flex flex-col items-center gap-2">
        <img
          src="/logo.png"
          alt="ZapLink Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
        />
        <span>© 2025 Anjali Kumari • All rights reserved.</span>
      </footer>
    </div>
  );
};

export default AppLayout;
