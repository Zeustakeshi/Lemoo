import { Divider } from "@mui/material";
import Footer from "../components/Footer/Footer";
import { Outlet } from "@tanstack/react-router";
import Header from "../components/Header/Header";

const LayoutSystem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <div className="flex h-full">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-200 border-r border-gray-300 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </aside>

        {/* Main Content */}
        <div className="flex-1 bg-white">
          <Outlet />
        </div>
      </div>

      {/* Divider */}
      <Divider className="my-2" />

      {/* Footer Section */}
      <footer className="bg-gray-100 border-t border-gray-300">
        <Footer />
      </footer>
    </div>
  );
};

export default LayoutSystem;
