import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { storeInfoApi } from "../api/storeInfo.api";
import { getUserInfo } from "../api/user.api";
import { Store } from "../common/type/store.type";
import { User } from "../common/type/user.type";
import { getRefreshToken } from "../helpers/utils/getRefreshToken";
import { logout } from "../helpers/utils/logout";
import { redirectToSSO } from "../helpers/utils/redirectToSSO";
import { getStoreStatusText } from "../lib/store.lib";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [storeInfo, setStoreInfo] = useState<Store | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading

    const onClickLogout = () => logout();

    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
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
                sessionStorage.setItem("storeInfo", JSON.stringify(resStore));
            } catch {
                console.log("Không tìm thấy cửa hàng (404)");
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="rounded-lg bg-red-50 p-6 text-red-500 shadow-lg">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-50 to-gray-100 p-6">
            <h1 className="mb-8 text-4xl font-extrabold text-blue-700 md:text-5xl">
                Chào mừng bạn!
            </h1>

            {/* Skeleton Loading hoặc Thông tin người dùng */}
            {isLoading ? (
                <div className="w-full max-w-md animate-pulse rounded-xl bg-white p-6 shadow-lg">
                    <div className="mx-auto h-20 w-20 rounded-full bg-gray-200"></div>
                    <div className="mt-4 h-6 w-3/4 rounded bg-gray-200"></div>
                    <div className="mt-4 h-10 w-full rounded bg-gray-200"></div>
                </div>
            ) : (
                user && (
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
                        <div className="flex flex-col items-center">
                            <img
                                src={user.avatar}
                                alt="avatar"
                                className="h-24 w-24 rounded-full border-4 border-blue-200 object-cover shadow-sm"
                            />
                            <h2 className="mt-3 text-2xl font-semibold text-gray-800">
                                {user.displayName}
                            </h2>
                        </div>
                    </div>
                )
            )}

            {/* Nút Đăng xuất */}
            <button
                onClick={onClickLogout}
                className="mt-6 rounded-lg bg-red-500 px-6 py-2.5 font-medium text-white shadow-md transition-all hover:bg-red-600 hover:shadow-lg"
            >
                Đăng xuất
            </button>

            {/* Skeleton Loading hoặc Thông tin cửa hàng */}
            {isLoading ? (
                <div className="mt-8 w-full max-w-md animate-pulse rounded-xl bg-white p-6 shadow-lg">
                    <div className="h-6 w-3/4 rounded bg-gray-200"></div>
                    <div className="mx-auto mt-4 h-24 w-24 rounded-lg bg-gray-200"></div>
                    <div className="mt-4 h-10 w-full rounded bg-gray-200"></div>
                </div>
            ) : storeInfo ? (
                <div className="mt-8 w-full max-w-md rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg font-medium text-gray-700">
                            Tên cửa hàng:{" "}
                            <span className="font-bold text-blue-600">
                                {storeInfo.name}
                            </span>
                        </h3>
                        <img
                            src={storeInfo.logo}
                            alt="logo"
                            className="mt-4 h-28 w-28 rounded-lg border-2 border-gray-200 object-cover shadow-sm"
                        />
                        <span className="my-4 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                            Trạng thái: {getStoreStatusText(storeInfo.status)}
                        </span>
                        <Link
                            to="/store/dashboard"
                            className="mt-2 rounded-lg bg-blue-500 px-6 py-2.5 font-medium text-white shadow-md transition-all hover:bg-blue-600 hover:shadow-lg"
                        >
                            Xem cửa hàng
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="mt-8 w-full max-w-md rounded-xl bg-white p-6 shadow-lg text-center transition-all hover:shadow-xl">
                    <h3 className="text-lg font-medium text-gray-700">
                        Bạn chưa có cửa hàng.
                    </h3>
                    <Link
                        to="/store/create"
                        className="mt-4 inline-block rounded-lg bg-blue-500 px-6 py-2.5 font-medium text-white shadow-md transition-all hover:bg-blue-600 hover:shadow-lg"
                    >
                        Tạo cửa hàng ngay!
                    </Link>
                </div>
            )}
        </div>
    );
}
