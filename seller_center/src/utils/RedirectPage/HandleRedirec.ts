import { redirect } from "@tanstack/react-router";

export const handleRedirect = (url: string) => {
  return () => {
    redirect({ to: url }); // Chuyển hướng tới trang đăng ký
  };
};
