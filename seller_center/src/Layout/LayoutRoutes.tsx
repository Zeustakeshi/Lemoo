import { Divider, List } from "@mui/material";
import { useState } from "react";
import NavItem from "./Nav/NavItem";
import { ChevronRight } from "@mui/icons-material";

const LayoutRoutes = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <List>
        <NavItem to="/" primaryText="Home" />
        <NavItem to="/Auth/Register" primaryText="Đăng Ký" />
        <NavItem to="/Auth/Login" primaryText="Đăng Nhập" />
        <div className="bg-slate-400 p-3">
          <button onClick={() => setOpen(!open)}>
            Sản Phẩm <ChevronRight />
          </button>
        </div>
        {open && (
          <div>
            <NavItem to="/Product/AddProduct" primaryText="Them San Pham" />
            <NavItem
              to="/Product/ProductManagement"
              primaryText="Quan Ly San Pham"
            />

            <NavItem
              to="/Product/BennerProducts"
              primaryText="Benner San Pham"
            />
            <NavItem
              to="/SanPham/XuLyBoiLazada"
              primaryText="Xu Ly Boi Lazada"
            />
          </div>
        )}
        <NavItem to="/Accout/AccoutSetting" primaryText="Tài Khoản" />
        <NavItem to="/Store/CreatStore" primaryText="Creat Store" />
        <NavItem to="/Hoang" primaryText="HomePageUI" />
        <NavItem to="/Test" primaryText="Thử" />
      </List>
      <Divider />
    </>
  );
};

export default LayoutRoutes;
