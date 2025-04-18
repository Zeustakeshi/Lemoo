import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

import { ReactNode, useRouter } from "@tanstack/react-router";
import {
    BellDot,
    Heart,
    Languages,
    LogOut,
    MonitorCog,
    MoonStar,
    Settings,
    ShoppingBag,
    SunDim,
    SunMoon,
    Truck,
    User,
} from "lucide-react";
type Props = {};

const HeaderProfile = ({}: Props) => {
    const { setTheme, theme } = useTheme();
    const { logout, user } = useAuth();

    const router = useRouter();

    return (
        <div className="flex justify-end items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar>
                        <AvatarImage src={user?.avatar}></AvatarImage>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[220px]">
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <User size={20} />
                            <span>Thông tin cá nhân</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </DropdownMenuGroup>
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            onClick={() => router.navigate({ to: "/cart" })}
                        >
                            <ShoppingBag size={20} />
                            <span>Giỏ hàng của tôi</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Heart />
                            <span>Sản phẩm yêu thích</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                router.navigate({ to: "/order/my-order" })
                            }
                        >
                            <Truck />
                            <span>Đơn hàng của tôi</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </DropdownMenuGroup>

                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <SunMoon />
                                <span>
                                    Giao diện:{" "}
                                    <span className="font-semibold">
                                        {theme === "dark"
                                            ? "Tối"
                                            : theme === "light"
                                              ? "Sáng"
                                              : "Hệ thống"}
                                    </span>
                                </span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem
                                        onClick={() => setTheme("light")}
                                    >
                                        <SunDim />
                                        <span>Sáng</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setTheme("dark")}
                                    >
                                        <MoonStar />
                                        <span>Tối</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setTheme("system")}
                                    >
                                        <MonitorCog />
                                        <span>Hệ thống</span>
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <Languages />
                                <span>Ngôn ngữ</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>
                                        <span>Tiếng Việt</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>English</span>
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                    </DropdownMenuGroup>

                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <BellDot />
                            <span>Quản lý thông báo</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings />
                            <span>Cài đặt</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </DropdownMenuGroup>

                    <DropdownMenuItem
                        onClick={logout}
                        className="!text-rose-500"
                    >
                        <LogOut />
                        <span>Đăng xuất</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

type MenuItemProps = {
    label: string;
    icon: ReactNode;
};
const MenuItem = ({ label, icon }: MenuItemProps) => {
    return (
        <DropdownMenuItem>
            {icon}
            {label}
        </DropdownMenuItem>
    );
};

export default HeaderProfile;
