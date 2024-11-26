import { Divider } from "@mui/material";
import Footer from "../components/Footer/Footer";
import { Outlet } from "@tanstack/react-router";
import Header from "../components/Header/Header";

const LayoutSystem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-col space-y-3">
      <div className="flex">
        <div className="bg-gray-200 flex-col h-screen border">
          <Header />
          <main>{children}</main>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
      <Divider />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default LayoutSystem;
