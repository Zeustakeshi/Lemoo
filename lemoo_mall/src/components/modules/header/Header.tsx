import GlobalSearch from "@/components/search/GlobalSearch";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import AppWrapper from "@/components/wrappers/AppWrapper";
import { ShoppingBag } from "lucide-react";
import TopHeader from "./TopHeader";

type Props = {};

const Header = ({}: Props) => {
    return (
        <div>
            <TopHeader></TopHeader>
            <div className="w-screen bg-white shadow-sm">
                <AppWrapper className=" px-4 py-3 flex ">
                    <div className="justify-start items-center gap-4">
                        <Logo size="lg"></Logo>
                    </div>
                    <div className="flex-1 flex justify-center items-center">
                        <GlobalSearch className="flex-1 max-w-[600px]"></GlobalSearch>
                    </div>
                    <div className=" flex justify-end items-center gap-4">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="  [&_svg]:size-6 [&_svg]:shrink-0"
                        >
                            <ShoppingBag />
                        </Button>
                        <Avatar>
                            <AvatarImage src="https://i.pravatar.cc/300"></AvatarImage>
                        </Avatar>
                    </div>
                </AppWrapper>
            </div>
        </div>
    );
};

export default Header;
