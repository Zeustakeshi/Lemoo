import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { logout } from "../helpers/utils/logout";
import { User } from "../common/type/user.type";
import { useEffect, useState } from "react";
import { getRefreshToken } from "../helpers/utils/getRefreshToken";
import { redirectToSSO } from "../helpers/utils/redirectToSSO";
import { getUserInfo } from "../api/user.api";
import { storeInfoApi } from "../api/storeInfo.api";
import { Store } from "../common/type/store.type";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [storeInfo, setStoreInfo] = useState<Store | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onClickLogout = () => logout();

  useEffect(() => {
    const checkAuth = async () => {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) {
        redirectToSSO();
        return;
      }

      try {
        const userData = await getUserInfo();
        setUser(userData);
        sessionStorage.setItem("userInfo", JSON.stringify(userData));
        const resStore = await storeInfoApi();
        setStoreInfo(resStore);
      } catch {
        console.log("Không tìm thấy cửa hàng (404)");
      }
    };

    checkAuth();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600">Chào mừng!</h1>

      {/* Thông tin người dùng */}
      {user && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg flex flex-col items-center">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-20 h-20 rounded-full border-2 border-blue-500"
          />
          <h1 className="mt-2 text-xl font-semibold">{user.displayName}</h1>
        </div>
      )}
      {/* Nút Đăng xuất */}
      <button
        onClick={onClickLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Đăng xuất
      </button>

      {/* Thông tin cửa hàng */}
      {storeInfo ? (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg flex flex-col items-center">
          <h1 className="text-lg">
            Tên cửa hàng:{" "}
            <span className="text-lg font-bold"> {storeInfo.name}</span>
          </h1>

          <img
            src={storeInfo.logo}
            alt="logo"
            className="w-24 h-24 mt-2 rounded-lg border"
          />
          <Link
            to="/store/dashboard"
            className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Xem cửa hàng
          </Link>
        </div>
      ) : (
        <div className="mt-6 text-center">
          <h1 className="text-lg font-medium text-gray-700">
            Bạn chưa có cửa hàng.
          </h1>
          <Link
            to="/store/create"
            className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Tạo cửa hàng ngay!
          </Link>
        </div>
      )}
    </div>
  );
}
