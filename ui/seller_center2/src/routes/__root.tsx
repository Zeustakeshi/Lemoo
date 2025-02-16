import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import LogoLemo from "../assets/LeMooEco.svg";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [isDropdownOpenPr, setIsDropdownOpenPr] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpenPr(!isDropdownOpenPr);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b border-gray-300 flex flex-col items-center">
          <img
            src={LogoLemo}
            alt="Lemoo Logo"
            className="w-20 h-auto object-cover"
          />
          <span className="font-semibold text-violet-600 text-3xl">Lemoo</span>
          <span className="text-yellow-600 text-lg">Seller Center</span>
        </div>
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li>
              <button
                onClick={toggleDropdown}
                className="w-full flex justify-between items-center px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Products
                <KeyboardArrowUpIcon
                  fontSize="medium"
                  className={`transition-transform duration-300 ${
                    isDropdownOpenPr ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isDropdownOpenPr && (
                <ul className="ml-6 space-y-2 mt-2">
                  <li>
                    <Link
                      to="/product/addProduct"
                      className="block px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                    >
                      Add Product
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/"
                className="block px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/store/dashboard"
                className="block px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Store Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/store/create"
                className="block px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Store Create
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}
