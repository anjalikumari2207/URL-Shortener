import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e1a] text-white">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="p-6 text-center bg-gray-800">
        © 2025 ZapLink • All rights reserved.
      </footer>
    </div>
  );
};

export default AppLayout;
