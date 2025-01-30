import { createFileRoute } from "@tanstack/react-router";
import { logout } from "../helpers/utils/logout";
import { User } from "../common/type/user.type";
import { useEffect, useState } from "react";
import { getUserInfo } from "../api/auth/user.api";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [user, setUser] = useState<User>();
  const onClickLogout = () => {
    return logout();
  };

  useEffect(() => {
    const getUser = async () => {
      const storedUserInfo = sessionStorage.getItem("userInfo");
      if (storedUserInfo) {
        const userInfo: User = JSON.parse(storedUserInfo);
        setUser(userInfo);
      } else {
        const user = await getUserInfo();
        setUser(user);
      }
    };
    getUser();
  }, []);

  return (
    <div>
      <h1>Helll wordl!! </h1>{" "}
      <button onClick={onClickLogout}> đăng xuất</button>
      {user && (
        <>
          <h1> {user?.displayName} </h1>
          <img src={user?.avatar} alt="avartar" />
        </>
      )}
    </div>
  );
}
