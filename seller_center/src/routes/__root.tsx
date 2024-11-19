import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>

      <div className="p-2 flex gap-2 ">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/Viet/ProductPage" className="[&.active]:font-bold">
          Quản lý sản phẩm
        </Link>
        <Link  to="/Viet/SettingAccount" className="[&.active]:font-bold">
        Account
        </Link>

      <Link to='/Viet/BannerUI'>
        Banner 
      </Link>

      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
