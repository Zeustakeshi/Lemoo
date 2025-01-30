import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import HomePageUI from "../components/HomePageUI";
import { useEffect } from "react";
import { isLoggedIn } from "../../apis";
import { API_ROOT } from "../utils/contants";
import athorizedAxiosInstance from "../utils/athorizedAxios";
import { useUserContext } from "../Context/UserContext";
import { AxiosError } from "axios";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  useEffect(() => {
    const checkStoreInfo = async () => {
      try {
        if (!isLoggedIn()) {
          return navigate({ to: "/Auth/Login" });
        } else {
          const res = await athorizedAxiosInstance.get(`/store/info`);
          if (res.status === 404) {
            // Nếu không có cửa hàng, điều hướng tới trang tạo cửa hàng
            return navigate({ to: "/Store/CreatStore" });
          }

          if (res.status === 200) {
            setUser(res.data.data);
            sessionStorage.setItem("StoreId", JSON.stringify(res.data.data.id));
          }
        }
      } catch (error: any) {
        if (error.status === 404) return navigate({ to: "/Store/CreatStore" });
      }
    };
    checkStoreInfo();
  }, []);
  return <HomePageUI />;
}
