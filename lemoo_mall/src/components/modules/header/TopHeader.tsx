import AppWrapper from "@/components/wrappers/AppWrapper";
import { Link } from "@tanstack/react-router";

type Props = {};

function TopHeader({}: Props) {
    return (
        <div className="bg-background-black">
            <AppWrapper className="py-1 flex justify-between items-center">
                <div className="flex-1 flex justify-start items-center gap-2 text-[12px]">
                    <Link className="text-white" to=".">
                        Trải nghiệm ứng dụng
                    </Link>
                    <Link className="text-white" to=".">
                        Bán hàng cùng Lemoo
                    </Link>
                    <Link className="text-white" to=".">
                        Chăm sóc khách hàng
                    </Link>
                </div>

                <h3 className="flex-1 text-white font-semibold text-center">
                    Happy new year! 🎉
                </h3>

                <div className="flex-1 flex justify-end items-center gap-2 text-[12px]">
                    <Link className="text-white" to=".">
                        Liên hệ hỗ trợ
                    </Link>
                </div>
            </AppWrapper>
        </div>
    );
}

export default TopHeader;
