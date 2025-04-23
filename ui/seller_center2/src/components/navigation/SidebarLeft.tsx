import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import LogoLemo from "../../assets/LeMooEco.svg";
type Props = {};

const SidebarLeft = (props: Props) => {
    const store = sessionStorage.getItem("storeInfo");
    return (
        <aside className="w-64 bg-white shadow-md flex flex-col h-[100svh] sticky top-0">
            <div className="p-6 border-b border-gray-300 flex flex-col items-center">
                <img
                    src={LogoLemo}
                    alt="Lemoo Logo"
                    className="w-20 h-auto object-cover"
                />
                <span className="font-semibold text-violet-600 text-3xl">
                    Lemoo
                </span>
                <span className="text-yellow-600 text-lg">Seller Center</span>
            </div>
            {/* Navigation */}
            {store && (
                <nav className="flex-1 p-4">
                    <ul className="space-y-4">
                        <SideBarItem to="/" label="Trang chủ"></SideBarItem>
                        <SideBarItem
                            label="Quản lý cửa hàng"
                            subItems={[
                                {
                                    label: "Dashboard",
                                    to: "/store/dashboard",
                                },
                            ]}
                        ></SideBarItem>
                        <SideBarItem
                            label="Quản lý sản phẩm"
                            subItems={[
                                {
                                    label: "Danh sách sản phẩm",
                                    to: "/product/manage",
                                },
                                {
                                    label: "Thêm sản phẩm",
                                    to: "/product/addProduct",
                                },
                            ]}
                        />

                        <SideBarItem
                            label="Quản lý đơn hàng"
                            subItems={[
                                {
                                    label: "Danh sách đơn hàng",
                                    to: "/order/manage",
                                },
                            ]}
                        />

                        <SideBarItem
                            label="Kênh Maketing"
                            subItems={[
                                {
                                    label: "Công cụ khuyến mãi",
                                    to: "/promotion/vouchers",
                                },
                            ]}
                        ></SideBarItem>
                    </ul>
                </nav>
            )}
        </aside>
    );
};

type SideBarItemProps = {
    label: string;
    to?: string;
    subItems?: { label: string; to: string }[];
};

const SideBarItem = ({ label, to, subItems }: SideBarItemProps) => {
    const [isDropdownOpenPr, setIsDropdownOpenPr] = useState(false);
    const router = useRouter();

    const toggleDropdown = () => {
        if (!subItems) {
            router.navigate({ to: to });
        } else {
            setIsDropdownOpenPr(!isDropdownOpenPr);
        }
    };

    return (
        <li>
            <button
                onClick={toggleDropdown}
                className="w-full flex justify-between items-center px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
                {label}
                {subItems && (
                    <KeyboardArrowUpIcon
                        fontSize="medium"
                        className={`transition-transform duration-300 ${
                            isDropdownOpenPr ? "rotate-180" : "rotate-0"
                        }`}
                    />
                )}
            </button>
            {subItems && isDropdownOpenPr && (
                <ul className="ml-6 space-y-2 mt-2">
                    {subItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.to}
                                className="block px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default SidebarLeft;
