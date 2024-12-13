import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { handleLogoutAPI } from "../../../apis";

// Đường dẫn import hàm API của bạn

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Gọi API để đăng xuất
      await handleLogoutAPI();
      // Chuyển hướng đến trang đăng nhập sau khi đăng xuất thành công
      navigate({ to: "/Auth/Login" });
    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
      alert("Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Đăng xuất
    </button>
  );
};

export default LogoutButton;
