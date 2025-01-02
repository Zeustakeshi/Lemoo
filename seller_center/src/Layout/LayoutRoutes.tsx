import { Divider, List } from "@mui/material";
import { useState } from "react";
import NavItem from "./Nav/NavItem";
import { ChevronRight } from "@mui/icons-material";

const LayoutRoutes = () => {
  const [open, setOpen] = useState(false);
  const [nameopen, setNameOpen] = useState([
    {
      name: "Tài khoản",
      subname: [{ sub: "cài đặt", link: "/Accout/AccoutSetting" }],
      show: false,
    },
    {
      name: "Kênh marketing",
      subname: [{ sub: "Công cụ khuyến mãi", link: "/Promotion" }],
      show: false,
    },
  ]);

  function showtab(sult: string) {
    setNameOpen((prev) =>
      prev.map((value) =>
        value.name === sult ? { ...value, show: !value.show } : value
      )
    );
  }
  return (
    <>
      <List>
        <NavItem to="/" primaryText="Home" />
        <NavItem to="/Auth/Register" primaryText="Đăng Ký" />
        <NavItem to="/Auth/Login" primaryText="Đăng Nhập" />
        <div className="hover:bg-slate-300 p-3">
          <button onClick={() => setOpen(!open)} className="flex items-center">
            Sản Phẩm
            <ChevronRight
              className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`}
            />
          </button>
        </div>
        {open && (
          <div className="ml-2">
            <ul>
              <li>
                <NavItem to="/Product/AddProduct" primaryText="Thêm Sản Phẩm" />
              </li>
              <li>
                {" "}
                <NavItem
                  to="/Product/ProductManagement"
                  primaryText="Quản Lý Sản Phẩm"
                />
              </li>
              <li>
                <NavItem
                  to="/Product/BennerProducts"
                  primaryText="Banner Sản Phẩm"
                />
              </li>
              <li>
                <NavItem
                  to="/SanPham/XuLyBoiLazada"
                  primaryText="Xử Lý Bởi Lazada"
                />
              </li>
            </ul>
          </div>
        )}

        <NavItem to="/Accout/AccoutSetting" primaryText="Tài Khoản" />
        <NavItem to="/Store/CreatStore" primaryText="Tạo Cửa Hàng" />

        {nameopen.map((item, index) => (
          <div key={index}>
            <li
              className="p-3 hover:bg-slate-400, cursor-pointer"
              onClick={() => showtab(item.name)}
            >
              {item.name} <ChevronRight />
              {item.show && (
                <ul>
                  {item.subname.map((sub, index) => (
                    <li key={index}>
                      <NavItem to={sub.link} primaryText={sub.sub} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </div>
        ))}

        <NavItem to="/Hoang" primaryText="HomePageUI" />
        <NavItem to="/Test" primaryText="Thử các components tại đây! 🚀" />
      </List>
      <Divider />
    </>
  );
};

export default LayoutRoutes;
