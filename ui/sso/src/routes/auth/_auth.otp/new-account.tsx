import NewAccountOtpForm from "@/components/modules/auth/NewAccountOtpForm";
import { Button } from "@/components/ui/button";
import {
    createFileRoute,
    useNavigate,
    useSearch,
} from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth/otp/new-account")({
    component: RouteComponent,
});

function RouteComponent() {
    const navigation = useNavigate();

    const { callback_url }: any = useSearch({
        strict: false,
    });

    return (
        <div className="p-5 my-10  flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold text-center">Xác thực OTP</h1>
            <p className="text-muted-foreground text-center my-5 max-w-[600px]">
                Nhập mã OTP để hoàn tất quá trình tạo tài khoản ý và bắt đầu
                hành trình mua sắm của bạn.
            </p>
            <div className="mt-5">
                <NewAccountOtpForm></NewAccountOtpForm>
            </div>
            <div className="mt-5 w-full flex justify-center items-center">
                <p>Tôi chưa nhận được mã? </p>{" "}
                <Button variant="link">Gửi lại</Button>
            </div>
            <div className="w-full flex justify-center">
                <Button
                    variant="link"
                    onClick={() =>
                        navigation({
                            to: "/auth/register",
                            search: { callback_url },
                        })
                    }
                >
                    Quay lại
                </Button>
            </div>
        </div>
    );
}
