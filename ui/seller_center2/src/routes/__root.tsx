import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import LogoLemo from "../assets/LeMooEco.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
    <div className="min-h-screen flex">
      <aside className="w-64 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <img
            src={LogoLemo} // Thay bằng đường dẫn tới logo
            alt="My App Logo"
            className="w-28 h-auto mx-auto object-cover"
          />
          <span className=" font-semibold text-violet-600 flex flex-col justify-center ">
            <span className="text-4xl">Lemoo</span>
            <span className="text-yellow-600 text-xl">Seller Center</span>
          </span>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li>
              <button
                onClick={toggleDropdown}
                className="block px-4 py-2 rounded hover:bg-gray-200 transition flex items-center justify-between"
              >
                Products
                <span
                  className={`transition-transform duration-300 ${
                    isDropdownOpenPr ? "rotate-0" : "rotate-180"
                  }`}
                >
                  <KeyboardArrowUpIcon fontSize="medium" />
                </span>
              </button>
            </li>

            {isDropdownOpenPr && (
              <ul className="space-y-2 ml-4">
                <li>
                  <Link
                    to="/product/addProduct"
                    className="block px-4 py-2 rounded hover:bg-gray-200 transition"
                  >
                    Add Product
                  </Link>
                </li>
              </ul>
            )}
            <li>
              <Link
                to="/"
                className="block px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}
