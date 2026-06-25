import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:py-10">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default Layout;
