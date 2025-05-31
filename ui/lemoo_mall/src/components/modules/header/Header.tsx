import GlobalSearch from "@/components/search/GlobalSearch";
import Logo from "@/components/ui/logo";
import AppWrapper from "@/components/wrappers/AppWrapper";
import CartSheet from "../cart/CartSheet";
import HeaderProfile from "./HeaderProfile";

type Props = {};

const Header = ({}: Props) => {
    return (
        <div className="h-[104px] sticky top-0 z-20">
            {/* <TopHeader></TopHeader> */}
            <div className="  bg-white dark:bg-slate-900 shadow-sm">
                <AppWrapper className=" px-4 py-3 flex ">
                    <div className="justify-start items-center gap-4">
                        <Logo size="lg"></Logo>
                    </div>
                    <div className="flex-1 flex justify-center items-center">
                        <GlobalSearch className="flex-1 max-w-[600px]"></GlobalSearch>
                    </div>
                    <div className=" flex justify-end items-center gap-4">
                        <CartSheet></CartSheet>
                        <HeaderProfile></HeaderProfile>
                    </div>
                </AppWrapper>
            </div>
        </div>
    );
};

export default Header;
